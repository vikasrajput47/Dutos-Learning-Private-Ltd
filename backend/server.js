import { app } from "./app.js";
import { connectDB } from "./data/database.js";



//connecting mongoDB
connectDB();


//server is starting here
app.listen(5000, () => {
  console.log("server running");
});