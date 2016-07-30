import mongoose from 'mongoose'
var Schema  = mongoose.Schema;

import autoIncrement from 'mongoose-auto-increment'
import config from './../config'
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

var pawnSchema =  new Schema({
  name : { type : String , lowercase :true, required : true },
  amount : { type : Number , required : true },
  pawnId : { type : Number , default  : 0 },
  particulars : { type : String , lowercase : true , trim : true , required : true },
  noOfItems :  { type : Number , required : true },
  totalgrams : { type : String , required : true },
  place : { type : String , required : true },
  returnDate : { type : Date , required : true },
  interestPerMonth : {  type : String , required : true },
  done : { type : Boolean , default : false },
  createdAt : {type : Date},
  updatedAt : {type : Date ,default  : Date.now},
  type : { type : String , default : 'pawn' }

})
pawnSchema.plugin(autoIncrement.plugin, { model: 'Pawn', field: 'pawnId',startAt: 100, incrementBy: 1 });


export default mongoose.model('Pawn', pawnSchema , 'pawn')
