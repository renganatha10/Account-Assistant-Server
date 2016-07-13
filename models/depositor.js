import mongoose from 'mongoose'
var schema = mongoose.Schema;


var depositorSchema = new schema({
  name : { type :String , required : true },
  depositorId : { type : Number , default  : 0 },
  amount : { type : Number, required : true },
  createdAt : {type : Date},
  updatedAt : {type : Date , required : true,  default  : Date.now}
})

export default mongoose.model('Depositor',depositorSchema,'depositor')
