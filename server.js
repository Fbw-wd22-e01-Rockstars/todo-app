import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import { verifyToken } from "./middlewares/verifyToken.js";

//To get the path of our build folder and index.html inside heroku we need path and URL
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";

//First we will try to get the name of the current file that is in our case server.js
const __filename = fileURLToPath(import.meta.url);

//we need to get name fo the current directory that is in our case TODO-App.
const __dirname = fileURLToPath(__filename);

console.log("File name and directory name:", __filename, __dirname);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));

//If we want to use some images or files accessible to user from our backend we need to declare them as static
//relative path to the build folder from server.js
//IF we want to share a file or image or js from our backend to front end
//then we need to declare that folder that is containing specific file as static
//For this reason we are using express.static() middleware inside our app.
app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 4000;

app.use("/auth", authRouter);
app.use("/dashboard", verifyToken, dashboardRouter);

app.post("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Backend running at port :", PORT);
    })
  )
  .catch((err) => console.log(err));
