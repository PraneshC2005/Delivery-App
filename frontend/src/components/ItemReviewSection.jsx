import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function ItemReviewSection({ itemId }) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold mb-2">Item Reviews</h3>
      <ReviewForm targetType="Item" targetId={itemId} />
      <ReviewList targetType="Item" targetId={itemId} />
    </div>
  );
}
