import mongoose from "mongoose";

const db = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://mongodb:27017/google_docs')
    console.log("connected to db")
  }catch (error){
    console.error("error:" ,error)
  }
}

export default db

