import mongoose from "mongoose";
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

},
//add this for auto createdAt and updatedat fields
{timestamps:true}
);

export const TestModel= mongoose.model("Test", TestSchema);