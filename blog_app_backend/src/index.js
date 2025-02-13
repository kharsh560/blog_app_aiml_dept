import dotenv from "dotenv";
import connectDB from "./db/dbConnectionLogic.js";
import app from "./app.js";
// import { insertStudents } from "./models/student.model.js";

dotenv.config({
    path: "./env"
})

// connectDB();
const port = process.env.PORT || 8000;
connectDB()
.then(() => {
  // Express part:-
  app.on("error", (errorInOnEvent) => {
    console.log("Error: ", errorInOnEvent);
    throw errorInOnEvent;
  });

  app.listen(port, () => {
    console.log(
      `App/Server is listening on port: http://64.227.140.158:${port}`
    );
  });

  // insertStudents(); -> Do not uncomment this.
  // Only do when the "students" database in mongoDB needs updation with new students.
  // Contact developer for updation queries. (Kumar Harsh 04814811622)
})
.catch((err) => {
    console.log("Mongo DB connection error!! ", err);
})








