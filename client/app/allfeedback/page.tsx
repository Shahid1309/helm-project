
"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  Calendar, 
  Filter, 
  Download, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Loader2,
  Eye,
  X,
  Award,
  GraduationCap,
  BookOpen,
  User,
  MessageSquare
} from "lucide-react";

export default function AllFeedbackPage() {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const QUESTIONS = [
    "How effectively did the teacher communicate concepts and instructions during class?",
    "How clearly did the teacher explain practical techniques and artistic processes related to the subject?",
    "How engaging and inspiring were the lessons or studio sessions?",
    "Did the teacher provide constructive and helpful feedback on your artwork?",
    "How well did the teacher manage the studio/class environment?",
    "How approachable and supportive was the teacher?",
    "Did the teacher encourage creativity, experimentation, and original thinking?",
    "How satisfied are you with the overall teaching style and guidance?",
    "How well did the teacher connect theory with practical activities?",
    "Did the teacher create a positive, respectful, and motivating atmosphere?"
  ];

  // const fetchFeedback = async () => {
  //   try {
  //     const res = await fetch("http://myapp-backend:5500/getfeedback");
  //     const data = await res.json();
  //     setFeedback(data.feedbackList || []);
  //     setFilteredFeedback(data.feedbackList || []);
  //   } catch (error) {
  //     console.error("Error fetching feedback:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchFeedback = async () => {
  try {
    const res = await fetch(`${API_URL}/getfeedback`);
    const data = await res.json();
    setFeedback(data.feedbackList || []);
    setFilteredFeedback(data.feedbackList || []);
  } catch (error) {
    console.error("Error fetching feedback:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchFeedback();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = feedback;

    if (searchTerm) {
      filtered = filtered.filter(
        (fb) =>
          (fb.studentName || fb.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (fb.studentRoll || fb.roll)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTeacher) {
      filtered = filtered.filter((fb) => (fb.teacherName || fb.teacher) === filterTeacher);
    }

    if (filterCourse) {
      filtered = filtered.filter((fb) => fb.course === filterCourse);
    }

    setFilteredFeedback(filtered);
  }, [searchTerm, filterTeacher, filterCourse, feedback]);

  const uniqueTeachers = [...new Set(feedback.map((fb) => fb.teacherName || fb.teacher).filter(Boolean))];
  const uniqueCourses = [...new Set(feedback.map((fb) => fb.course).filter(Boolean))];

  const getResponseColor = (response: string) => {
    const positive = ["excellent", "very clear", "very engaging", "always", "very supportive", "very satisfied", "very well"];
    const good = ["good", "clear", "engaging", "often", "supportive", "satisfied", "well"];
    const neutral = ["fair", "somewhat clear", "neutral", "sometimes", "somewhat supportive", "somewhat"];
    
    const lower = response?.toLowerCase();
    if (positive.some(p => lower?.includes(p))) return "bg-green-100 text-green-800 border-green-200";
    if (good.some(g => lower?.includes(g))) return "bg-blue-100 text-blue-800 border-blue-200";
    if (neutral.some(n => lower?.includes(n))) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const exportToCSV = () => {
    const headers = ["Name", "Roll", "Course", "Year", "Subject", "Teacher", ...QUESTIONS.map((q, i) => `Q${i + 1}`), "Date"];
    const rows = filteredFeedback.map(fb => [
      fb.studentName || fb.name,
      fb.studentRoll || fb.roll,
      fb.course,
      fb.year,
      fb.subject,
      fb.teacherName || fb.teacher,
      fb.q1, fb.q2, fb.q3, fb.q4, fb.q5,
      fb.q6, fb.q7, fb.q8, fb.q9, fb.q10,
      new Date(fb.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading feedback data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Feedback Dashboard</h1>
              <p className="text-blue-100">View and analyze student feedback responses</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <FileText className="w-12 h-12" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-800">{filteredFeedback.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Teachers Reviewed</p>
                <p className="text-3xl font-bold text-gray-800">{uniqueTeachers.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Courses</p>
                <p className="text-3xl font-bold text-gray-800">{uniqueCourses.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <select
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all capitalize"
            >
              <option value="">All Teachers</option>
              {uniqueTeachers.map((teacher, idx) => (
                <option key={`teacher-${idx}-${teacher}`} value={teacher} className="capitalize">
                  {teacher}
                </option>
              ))}
            </select>

            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all capitalize"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map((course, idx) => (
                <option key={`course-${idx}-${course}`} value={course} className="capitalize">
                  {course}
                </option>
              ))}
            </select>

            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Feedback Cards (Mobile & Desktop Friendly) */}
        <div className="space-y-4">
          {filteredFeedback.map((fb, index) => (
            <div key={`feedback-${fb._id || index}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{fb.studentName || fb.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="font-medium">Roll: {fb.studentRoll || fb.roll}</span>
                        <span>•</span>
                        <span className="capitalize">{fb.course}</span>
                        <span>•</span>
                        <span>{fb.year}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    {expandedRow === index ? "Hide" : "View"}
                    {expandedRow === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 capitalize">Subject: <strong>{fb.subject}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 capitalize">Teacher: <strong>{fb.teacherName || fb.teacher}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{new Date(fb.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRow === index && (
                <div className="p-6 bg-white">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Detailed Responses
                  </h4>
                  <div className="space-y-3">
                    {QUESTIONS.map((question, qIndex) => {
                      const response = fb[`q${qIndex + 1}`];
                      return (
                        <div key={qIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            {qIndex + 1}. {question}
                          </p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getResponseColor(response)}`}>
                            {response || "No response"}
                          </span>
                        </div>
                      );
                    })}
                    
                    {fb.feedbackMessage && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Additional Comments:</p>
                        <p className="text-gray-600 italic">{fb.feedbackMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Feedback Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}