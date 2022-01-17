import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'
import  aggregatePaginate from 'mongoose-aggregate-paginate-v2'

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
  },
  },
//add this for auto createdAt and updatedat fields
{timestamps:true}
);
TestSchema.plugin(autoIncrement.plugin, { model: 'Test', field: 'testNo' });
TestSchema.plugin(aggregatePaginate);

export const TestModel= mongoose.model("Test", TestSchema);



export const dummy_persons=[
  {id:1,name:"monday",age:20,gender:"Male"},
  {id:2,name:"tuesday",age:21,gender:"Male"},
  {id:3,name:"Wednesday",age:22,gender:"Male"},
  {id:4,name:"Thursday",age:23,gender:"Male"},
 {id:5,name:"Friday",age:24,gender:"Male"},
 {id:6,name:"Saturday",age:25,gender:"Male"},
 {id:7,name:"Sunday",age:26,gender:"Male"},
 
]


const PersonSchema = new Schema({
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
  },
  },
//add this for auto createdAt and updatedat fields
{timestamps:true}
);
PersonSchema.plugin(autoIncrement.plugin, { model: 'Test', field: 'testNo' });
PersonSchema.plugin(aggregatePaginate);

export const PersonModel= mongoose.model("Person", PersonSchema);