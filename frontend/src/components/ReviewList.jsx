import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

export default function ReviewList({ targetType, targetId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
  const res = await axios.get(`${serverUrl}/api/review?targetType=${targetType}&targetId=${targetId}`);
        setReviews(res.data.reviews || []);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [targetType, targetId]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews yet.</div>;

  return (
    <div className="space-y-2 mt-2">
      {reviews.map((r) => (
        <div key={r._id} className="border rounded p-2 bg-gray-50">
          <div className="font-semibold text-yellow-600">{"★".repeat(r.rating)}<span className="text-gray-400">{"★".repeat(5 - r.rating)}</span></div>
          <div className="text-sm text-gray-700">{r.comment}</div>
          <div className="text-xs text-gray-500">By {r.user?.fullName || "User"} on {new Date(r.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}
