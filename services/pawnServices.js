import Pawn from './../models/pawndetails';
var ObjectId = require('mongoose').Types.ObjectId;
import DayBook from './../models/daybook';

 export default class PawnService {
  addPawn(req, res, next){
    var pawn = new Pawn();
    Object.keys(req.body).map((key, index) => {
      pawn[key] = req.body[key];
    })
    this.savePawn(pawn , res)
  }

  editPawn(req,res,next){
    Pawn.findOne({_id : new ObjectId(req.body._id)}).exec((err,pawn) => {
      if(err) return res.end("Error Occured" , err);
      else if(!pawn) return res.send("Pawn Not Found");
      Object.keys(req.body).map((key, index) => {
        pawn[key]  = req.body[key]
      })
      this.savePawn(pawn, res)
    })
  }

  getPawn(req, res,next){
    Pawn.find({}).sort({updatedAt : -1}).exec((err, pawn) => {
      if(err) return res.send({ message : 'cannot find Pawn', err : err});
      return res.send(pawn)
    });
  }

  getPawnById(req,res,next){
    Pawn.findOne({pawnId : req.params.id}).exec((err,pawn) => {
      if(err) return res.end("Error Occured" , err);
      else if(!pawn) return res.send("Depositor Not Found");
      DayBook.find({pawnId : pawn._id}).exec((err , dayBook) => {
        if(err) return  res.send({message : "Conanot Load DayBook for pawn iD" , err : err})
        return  res.send({  pawn ,dayBook });
      })
    })
  }

  savePawn(pawn , res){
    try {
      pawn.save(function(err) {
        if (err) return next(err);
        res.send({
          message: 'Pawn  has been added successfully!',
          id: pawn["_id"]
        });
      });
    } catch (e) {
      res.status(404).send({ message: ' Could not save the Pawn to database due to: ' + e });
    }
  }
}
