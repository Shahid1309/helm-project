// // Node.js + Express + MongoDB (Mongoose) backend for Feedback Form
// // Install dependencies:
// // npm install express cors mongoose

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ----------------------
// // 🔗 MongoDB Connection
// // ----------------------
// const MONGO_URL ="mongodb+srv://shahiid1309_db_user:C1Na5UCsgDyEkQbX@cluster0.tbsedbm.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0";



// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // ----------------------
// // 🏷️ Feedback Schema
// // ----------------------
// const feedbackSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   roll: { type: String, required: true },
//   course: { type: String, required: true },
//   year: { type: String, required: true },
//   subject: { type: String, required: true },
//   teacher: { type: String, required: true },

//   q1: String,
//   q2: String,
//   q3: String,
//   q4: String,
//   q5: String,
//   q6: String,
//   q7: String,
//   q8: String,
//   q9: String,
//   q10: String,

//   createdAt: { type: Date, default: Date.now }
// });


// const Feedback = mongoose.model("Feedback", feedbackSchema);

// // ----------------------
// // ➕ POST: Save Feedback
// // ----------------------
// app.post('/addfeedback', async (req, res) => {
//   try {
//     const newFeedback = new Feedback(req.body);
//     await newFeedback.save();

//     res.status(201).json({ message: "Feedback stored successfully", data: newFeedback });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving feedback", error });
//   }
// });

// // ----------------------
// // 📥 GET: Fetch All Feedback
// // ----------------------
// app.get('/getfeedback', async (req, res) => {
//   try {
//     const feedbackList = await Feedback.find().sort({ createdAt: -1 });
//     res.json({ count: feedbackList.length, feedbackList });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching feedback", error });
//   }
// });

// // Root
// app.get('/', (req, res) => {
//   res.send('Fine Arts Feedback API is running');
// });

// // Start Server
// const PORT = 5500;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// 🔗 MongoDB Connection
// ----------------------
const MONGO_URL ="mongodb+srv://shahiid1309_db_user:C1Na5UCsgDyEkQbX@cluster0.tbsedbm.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ----------------------
// 🏷️ Feedback Schema
// ----------------------
const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentRoll: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  subject: { type: String, required: true },
  teacherName: { type: String, required: true },

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

// ----------------------
// ➕ POST: Save Feedback
// ----------------------
app.post('/addfeedback', async (req, res) => {
  try {

    // your frontend body goes directly into MongoDB
    const newFeedback = new Feedback(req.body);

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback stored successfully",
      data: newFeedback
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving feedback",
      error
    });
  }
});

// ----------------------
// 📥 GET: Fetch All Feedback
// ----------------------
app.get('/getfeedback', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });

    res.json({
      count: feedbackList.length,
      feedbackList
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching feedback",
      error
    });
  }
});

// Root
app.get('/', (req, res) => {
  res.send('Fine Arts Feedback API is running');
});

// Start Server
const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
