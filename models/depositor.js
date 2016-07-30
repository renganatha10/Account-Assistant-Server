import mongoose from 'mongoose'
var schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment'
import config from './../config'
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

var depositorSchema = new schema({
  name : { type :String , required : true },
  depositorId : { type : Number , default  : 0 },
  amount : { type : Number, required : true },
  createdAt : {type : Date},
  updatedAt : {type : Date , required : true,  default  : Date.now},
  type : { type : String , default : 'depositor' },
})

depositorSchema.plugin(autoIncrement.plugin,
  { model: 'Depositor', field: 'depositorId', startAt: 100, incrementBy: 1 });
export default mongoose.model('Depositor',depositorSchema,'depositor')
