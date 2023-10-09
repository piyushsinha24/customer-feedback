import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/feedback.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const hostname = "127.0.0.1";
const port = 3000;

// connecting to mongodb atlas
mongoose.connect(
  "mongodb+srv://spiyushdev:mongoDB@cluster0.jliucfy.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// routes
app.get("/feedback/all", async (req, res) => {
    try {
        const response = await Feedback.find();
        if (response) res.status(200).send({status: 'success', feedbacks: response});
      } catch (e) {
        res.status(500).send(e);
      }   
});

app.post("/feedback/save", async (req, res) => {
  try {
    const response = await Feedback.create(req.body);
    if (response) res.status(200).send({status: 'success', message: 'feedback submitted succesffuly!'});
  } catch (e) {
    res.status(500).send(e);
  }
});

// start Server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
