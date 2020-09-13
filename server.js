import express from "express";
import mongoose from "mongoose";
import config from "./config";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

//Impoting routes
import AuthRoute from "./Routes/auth";
import StoryRoute from "./Routes/story";

const app = express();

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
//https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set("useFindAndModify", false);
app.use(cors());
//Middle wares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes / Apis
app.use("/api/auth", AuthRoute);
app.use("/api/story", StoryRoute);
//fallback
app.get("/api", (req, res) => {
  res.write("Welcome to Pratilipi story book");
  res.end();
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  //For any route, we will serve index.html (SPA)
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000; //in local dev, we use port 4000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
