import mongoose from "mongoose";

let connection = null;

export default class MongoClient {
  static connect = () => {
    var mongoDb = "mongodb://root:root@localhost:27018";
    mongoose.connect(mongoDb);
    var connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "MongoDB Connection error"));
  }
}