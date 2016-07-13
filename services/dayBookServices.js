'use strict'
import DayBook from './../models/daybook';
import Pawn from './../models/pawndetails';
import Depositor from './../models/depositor';

export default class DayBookService {
  addDayBook(req, res, next){
      var dayBook = new DayBook();
      Object.keys(req.body).map((key, index) => {
        dayBook[key]  = req.body[key]
      })
      this.saveDayBook(dayBook, res, next);
  }

  editDayBook(req,res,next){
    DayBook.find({ _id : req.body._id }).exec((err, dayBook) => {
      if(err) return res.end("Error Occured" , err);
      else if(!dayBook) return res.send("Day Book Not Found");
      Object.keys(req.body).map((key, index) => {
        dayBook[key]  = req.body[key]
      })
      this.saveDayBook(dayBook, res)

    })

  }

  getDayBook(req, res,next){
    DayBook.find( {} , function(err , daybook){
      if(err) return res.send({ message : 'cannot find DayBooks'  , err : err});
      return res.json(daybook);
    })
  }

  getAllDetailsCombined(req,res,next){
    let responseArray = [];
    let depostiorArray = [];
    let pawnArray = [];
    let dayBookArray = [];
    let depositPromise  = new Promise((resolve, reject) => {
      Depositor.find({}).sort('createdAt').exec(function(err , depositor){
        if(err) reject(new Error(err))
        else{
            resolve(depositor)
        }
      })
    });
    let pawnPromise = new Promise((resolve, reject) => {
      Pawn.find({}).sort('createdAt').exec(function(err , pawns){
        if(err) reject(new Error(err))
        else{
            resolve(pawns)
        }
      });
    });
    let dayBookPromise = new Promise((resolve,reject)=>{
      DayBook.find({}).sort('createdAt').populate('pawnId depositorId').exec(function(err,daybooks){
        if(err) reject(new Error(err))
        else{
            resolve(daybooks)
        }
      });
    })

    Promise.all([depositPromise, pawnPromise,dayBookPromise])
            .then((response) => { let allData =  this.returnCurrentObject(response);  res.json(allData);  })
            .catch((err) => { console.log(err);  res.status(404).send({ message: 'Property not found.' }); });
  }

  returnCurrentObject(response){
    var array = []
    response.map((item) => { item.map(subItem => array.push(subItem)) });
    return array;

  }

  saveDayBook(daybook, res , next) {
   try {
     daybook.save(function(err) {
       if (err) return next(err);
       res.send({
         message: 'DayBook  has been added successfully!',
         id: daybook["_id"]
       });
     });
   } catch (e) {
     res.status(404).send({ message: ' Could not save the DayBook to database due to: ' + e });
   }
   }
}
