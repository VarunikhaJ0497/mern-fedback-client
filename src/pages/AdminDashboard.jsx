import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await api.get("/feedback");
      setFeedbacks(res.data);

      // calculate average rating
      if (res.data.length > 0) {
        const total = res.data.reduce((sum, f) => sum + f.rating, 0);
        setAvgRating((total / res.data.length).toFixed(1));
      }
    } catch (err) {
      alert("Failed to load feedback");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">Total Feedback</h3>
            <p className="text-3xl font-bold">{feedbacks.length}</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">Average Rating</h3>
            <p className="text-3xl font-bold text-yellow-500">
              ⭐ {avgRating}
            </p>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No feedback available
                  </td>
                </tr>
              ) : (
                feedbacks.map((f) => (
                  <tr key={f._id} className="text-center">
                    <td className="p-2 border">
                      {f.studentId?.name || "Student"}
                    </td>
                    <td className="p-2 border">{f.course}</td>
                    <td className="p-2 border">⭐ {f.rating}</td>
                    <td className="p-2 border">{f.comment}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
