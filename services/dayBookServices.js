'use strict'
import DayBook from './../models/daybook'

class DayBookService {
  addDayBook(req, res, next){
      var dayBook = new DayBook();
      Object.keys(req.body).map((key, index) => {
        dayBook[key]  = req.body[key]
      })
      this.saveDayBook(daybook, res)
  }

  editDayBook(req,res,next){
    DayBook.find({ _id : req.body._id }).exec((err, dayBook) => {
      if(err) return res.end("Error Occured" , err);
      else if(!dayBook) return res.send("Day Book Not Found");
      Object.keys(req.body).map((key, index) => {
        dayBook[key]  = req.body[key]
      })
      this.saveDayBook(daybook, res)

    })

  }

  getDayBook(req, res,next){
    DayBook.find( {} , function(err , daybook){
      if(err) return res.send ({ message : cannot find DayBooks, err : err});
      return res.json(daybook);
    })
  }

  getAllDetailsCombined(req,res,next){

  }

  saveProperty(daybook, res) {
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

export default new DayBookService();
