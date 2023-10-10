import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/feedback.js";
import bodyParser from "body-parser";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import verifyToken from "./middlewares/authorization.js";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const hostname = "127.0.0.1";
const port = 3000;

// connecting to mongodb atlas

mongoose.connect(
  "mongodb+srv://spiyushdev:mongoDB@cluster0.jliucfy.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// feedback routes

app.get("/feedback/all", verifyToken, async (req, res) => {
  try {
    const response = await Feedback.find();
    if (response)
      res.status(200).send({ status: "success", feedbacks: response });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/feedback/save", async (req, res) => {
  try {
    const response = await Feedback.create(req.body);
    if (response)
      res
        .status(200)
        .send({
          status: "success",
          message: "feedback submitted succesffuly!",
        });
  } catch (e) {
    res.status(500).send(e);
  }
});

// authentication routes

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .send({ status: "failed", message: "user already exists!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).send(user);
    } else
      res
        .status(400)
        .send({ status: "failed", message: "invalid credentials!" });
  } catch (e) {
    res.status(500).send(e);
  }
});

// start server

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
