import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

export default function ReviewForm({ targetType, targetId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `${serverUrl}/api/review/add`,
        { targetType, targetId, rating, comment },
        { withCredentials: true }
      );
      setSuccess("Review submitted!");
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      <div>
        <label className="block font-medium">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="bg-[#ff4d2d] text-white px-4 py-1 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
}
