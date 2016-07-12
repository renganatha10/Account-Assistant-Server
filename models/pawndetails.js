import mongoose from 'mongoose'
var Schema  = mongoose.Schema;


var pawnSchema =  new Schema({
  name : { type : String , required : true },
  amount : { type : Number , required : true },
  particulars : { type : String , lowercase : true , trim : true , required : true },
  noOfItems :  { type : Number , required : true },
  totalgrams : { type : Number , required : true },
  place : { type : String , required : true },
  returnDate : { type : String , required : true },
  interestPerMonth : {  type : Number , required : true },
  done : { type : Boolean },
  createdAt : {type : Date},
  updatedAt : {type : Date ,default  : Date.Now}
})

export default mongoose.model('Pawn', pawnSchema , 'pawn')
