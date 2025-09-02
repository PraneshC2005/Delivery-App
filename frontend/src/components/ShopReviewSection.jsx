import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function ShopReviewSection({ shopId }) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold mb-2">Shop Reviews</h3>
      <ReviewForm targetType="Shop" targetId={shopId} />
      <ReviewList targetType="Shop" targetId={shopId} />
    </div>
  );
}
