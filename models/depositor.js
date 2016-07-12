import mongoose from 'mongoose'
var schema = mongoose.Schema;


var depositorSchema = new schema({
  name : { type :String , required : true },
  amount : { type : Number, required : true },
  createdAt : {type : Date},
  updatedAt : {type : Date ,default  : Date.Now}
})

export default mongoose.model('Depositor',depositorSchema,'depositor')
