import mongoose from "mongoose";
import { configs } from "@configs";

// Mongodb Setup
const mongodbConnectionString = `mongodb+srv://${configs.mongoDB.host}`;

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongodbConnectionString, {
      user: configs.mongoDB.user,
      pass: configs.mongoDB.pass,
      dbName: configs.mongoDB.db,
      useNewUrlParser: true
    });
    console.info("MONGODB: Connection OK");
  } catch (err) {
    console.error("MONGODB: Connection Error: ", err);
    process.exit(1);
  }
};
mongoConnect();
