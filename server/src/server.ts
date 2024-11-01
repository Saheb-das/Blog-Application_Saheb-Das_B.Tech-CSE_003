import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// internal imports
import connectDB from "./connect-db/connectDB";
import appRouter from "./routes/index";
import notMatchRoute from "./middleware/notMatchRoute";
import errorHandler from "./middleware/errorHandler";

// create app and config
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//   })
// );

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use("/api/v1", appRouter);

// no match route
app.use(notMatchRoute);

// global error handler
app.use(errorHandler);

// server connection
connectDB(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("db connected");

    // server
    app.listen(process.env.PORT || "3000", () => {
      console.log("server is running...", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("db connection is failed");
    console.log("Error:", err);
  });
