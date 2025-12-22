const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Schema
const feedbackSchema = new mongoose.Schema({
  studentName: String,
  studentRoll: String,
  course: String,
  year: String,
  subject: String,
  teacherName: String,
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  q6: String,
  q7: String,
  q8: String,
  q9: String,
  q10: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Routes
app.post('/addfeedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getfeedback', async (req, res) => {
  try {
    const list = await Feedback.find().sort({ createdAt: -1 });
    res.json({ count: list.length, feedbackList: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Fine Arts Feedback API is running');
});

// Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
