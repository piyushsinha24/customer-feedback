import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  comments: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
