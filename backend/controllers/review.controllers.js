import Review from "../models/review.model.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";
import User from "../models/user.model.js";

// Add a review (for Shop, Item, or Delivery)
export const addReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;
    const userId = req.userId;
    if (!targetType || !targetId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Create review
    const review = await Review.create({
      user: userId,
      targetType,
      targetId,
      rating,
      comment,
    });
    // Attach review to target and update average
    if (targetType === "Shop") {
      const shop = await Shop.findById(targetId);
      if (!shop) return res.status(404).json({ message: "Shop not found" });
      shop.reviews.push(review._id);
      shop.ratings.push(rating);
      await shop.save();
    } else if (targetType === "Item") {
      const item = await Item.findById(targetId);
      if (!item) return res.status(404).json({ message: "Item not found" });
      if (!item.reviews) item.reviews = [];
      if (!item.ratings) item.ratings = [];
      item.reviews.push(review._id);
      item.ratings.push(rating);
      await item.save();
    } else if (targetType === "Delivery") {
      const user = await User.findById(targetId);
      if (!user) return res.status(404).json({ message: "Delivery user not found" });
      if (!user.ratings) user.ratings = [];
      user.ratings.push(rating);
      await user.save();
    } else {
      return res.status(400).json({ message: "Invalid targetType" });
    }
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get reviews for a target (Shop, Item, Delivery)
export const getReviews = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;
    if (!targetType || !targetId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const reviews = await Review.find({ targetType, targetId }).populate("user", "fullName").sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
