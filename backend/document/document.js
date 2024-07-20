import mongoose, { Mongoose } from "mongoose";

const documnetSchema = new mongoose.Schema({
  _id: String,
  data: Object,
}, {timestamps:true})

const Documnet = mongoose.model('Documnet', documnetSchema)

export default Documnet;
