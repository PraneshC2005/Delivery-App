import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function DeliveryBoyReviewSection({ deliveryBoyId }) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-bold mb-2">Delivery Boy Reviews</h3>
      <ReviewForm targetType="Delivery" targetId={deliveryBoyId} />
      <ReviewList targetType="Delivery" targetId={deliveryBoyId} />
    </div>
  );
}
