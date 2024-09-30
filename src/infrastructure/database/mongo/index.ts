import mongoose from "mongoose";


export default class MongoClient {
  static connect = () => {    
    var mongoDb = process.env.MONGO_URL;
    mongoose.connect(mongoDb)
    var connection = mongoose.connection;

    
    connection.on("error", console.error.bind(console, "MongoDB Connection error"));

    connection.once("open", () => {
      console.log("MongoDB connected successfully");
    });

    
    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  }
}