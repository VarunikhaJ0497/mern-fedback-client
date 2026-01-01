import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async () => {
    if (!course || rating === 0) {
      alert("Please enter course and rating");
      return;
    }

    try {
      // Make sure rating is number and payload matches backend model
      const payload = {
        course,
        rating: Number(rating),
        comment
      };

      const res = await api.post("/feedback", payload);

      setMessage("✅ Feedback submitted successfully");
      setCourse("");
      setRating(0);
      setComment("");
    } catch (err) {
      // Show detailed error from backend if available
      const errMsg =
        err.response?.data?.message || "Failed to submit feedback";
      alert(errMsg);
      console.error("Feedback submission error:", err.response || err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
            {message}
          </div>
        )}

        <input
          className="border p-2 w-full mb-3"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <label className="block mb-1 font-semibold">Rating</label>
        <select
          className="border p-2 w-full mb-3"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="0">Select Rating</option>
          <option value="1">⭐ 1</option>
          <option value="2">⭐ 2</option>
          <option value="3">⭐ 3</option>
          <option value="4">⭐ 4</option>
          <option value="5">⭐ 5</option>
        </select>

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitFeedback}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </div>
    </>
  );
}
