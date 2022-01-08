import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'

const uri = "mongodb://localhost:27017/testmongo";
const connection = mongoose.createConnection(uri);
autoIncrement.initialize(connection);


const Schema = mongoose.Schema;

const TestSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  testNo:{
    type: Number,
    required: true
  }

},
//add this for auto createdAt and updatedat fields
{timestamps:true}
);
TestSchema.plugin(autoIncrement.plugin, { model: 'Test', field: 'testNo' });

export const TestModel= mongoose.model("Test", TestSchema);