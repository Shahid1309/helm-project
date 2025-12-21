

"use client";

import { useState } from "react";
import { User, GraduationCap, BookOpen, Send, MessageSquare, CheckCircle, Loader2, Award } from "lucide-react";

interface FormState {
  name: string;
  roll: string;
  course: string;
  year: string;
  subject: string;
  teacher: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
}

export default function FeedbackForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    roll: "",
    course: "",
    year: "",
    subject: "",
    teacher: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${API_URL}/addfeedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: form.name,
          studentRoll: form.roll,
          course: form.course,
          year: form.year,
          subject: form.subject,
          teacherName: form.teacher,
          q1: form.q1,
          q2: form.q2,
          q3: form.q3,
          q4: form.q4,
          q5: form.q5,
          q6: form.q6,
          q7: form.q7,
          q8: form.q8,
          q9: form.q9,
          q10: form.q10,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setForm({
      name: "",
      roll: "",
      course: "",
      year: "",
      subject: "",
      teacher: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform animate-in">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 p-6 rounded-full animate-bounce">
                <CheckCircle className="w-20 h-20 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Feedback Submitted Successfully! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your valuable response
            </p>
            <p className="text-gray-500 mb-8">
              Your feedback helps us improve the learning experience
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Award className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-semibold text-gray-700">Submission Details</p>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Student:</strong> {form.name} ({form.roll})
              </p>
              <p className="text-sm text-gray-700">
                <strong>Course:</strong> {form.course} - {form.year}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Subject:</strong> {form.subject}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Teacher:</strong> {form.teacher}
              </p>
            </div>

            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = [
    {
      key: "q1",
      label: "1. How effectively did the teacher communicate concepts and instructions during class?",
      options: ["Excellent", "Good", "Fair", "Poor"],
    },
    {
      key: "q2",
      label: "2. How clearly did the teacher explain practical techniques and artistic processes related to the subject?",
      options: ["Very clear", "Clear", "Somewhat clear", "Not clear"],
    },
    {
      key: "q3",
      label: "3. How engaging and inspiring were the lessons or studio sessions?",
      options: ["Very engaging", "Engaging", "Neutral", "Not engaging"],
    },
    {
      key: "q4",
      label: "4. Did the teacher provide constructive and helpful feedback on your artwork?",
      options: ["Always", "Often", "Sometimes", "Rarely"],
    },
    {
      key: "q5",
      label: "5. How well did the teacher manage the studio/class environment (discipline, timing, material handling)?",
      options: ["Excellent", "Good", "Fair", "Poor"],
    },
    {
      key: "q6",
      label: "6. How approachable and supportive was the teacher when you needed help or clarification?",
      options: ["Very supportive", "Supportive", "Somewhat supportive", "Not supportive"],
    },
    {
      key: "q7",
      label: "7. Did the teacher encourage creativity, experimentation, and original thinking in your work?",
      options: ["Always", "Often", "Sometimes", "Rarely"],
    },
    {
      key: "q8",
      label: "8. How satisfied are you with the overall teaching style and guidance provided by the teacher?",
      options: ["Very satisfied", "Satisfied", "Neutral", "Not satisfied"],
    },
    {
      key: "q9",
      label: "9. How well did the teacher connect theory with practical or studio activities?",
      options: ["Very well", "Well", "Somewhat", "Not well"],
    },
    {
      key: "q10",
      label: "10. Did the teacher create a positive, respectful, and motivating classroom atmosphere?",
      options: ["Always", "Often", "Sometimes", "Rarely"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <GraduationCap className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2">
            Student Feedback Form
          </h1>
          <p className="text-center text-blue-100 text-lg">
            Share your experience and help us improve
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Student Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roll"
                    placeholder="Enter roll number"
                    value={form.roll}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Course Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                  >
                    <option value="">Select Course</option>
                    <option value="bachlors in fine art">Bachelors in Fine Art</option>
                    <option value="masters in fine art">Masters in Fine Art</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Year</option>
                    <option value="1st yr">1st yr</option>
                    <option value="2nd yr">2nd yr</option>
                    <option value="3rd yr">3rd yr</option>
                    <option value="4th yr">4th yr</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                  >
                    <option value="">Select Subject</option>
                    <option value="applied art">Applied Art</option>
                    <option value="gaming">Gaming</option>
                    <option value="craft">Craft</option>
                    <option value="singing">Singing</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Teacher <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="teacher"
                    value={form.teacher}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                  >
                    <option value="">Select Teacher</option>
                    <option value="teacher 1">Teacher 1</option>
                    <option value="teacher 2">Teacher 2</option>
                    <option value="teacher 3">Teacher 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Feedback Questions</h2>
              </div>

              <div className="space-y-5">
                {questions.map((q, index) => (
                  <div
                    key={q.key}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
                  >
                    <label className="block font-medium text-gray-800 mb-3">
                      {q.label} <span className="text-red-500">*</span>
                    </label>

                    <select
                      name={q.key}
                      value={(form as any)[q.key]}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
                    >
                      <option value="">-- Select your response --</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Feedback...
                </>
              ) : (
                <>
                  Submit Feedback
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          🔒 Your feedback is confidential and will help improve the learning experience
        </p>
      </div>
    </div>
  );
}