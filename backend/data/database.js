import mongoose from "mongoose";


export const connectDB = () => {
    mongoose
      .connect("mongodb://127.0.0.1:27017/", {
        dbName: "Dutos",
      })
      .then(() => {
        console.log("database connect");
      })
      .catch((e) => {
        console.log(e);
      });
}