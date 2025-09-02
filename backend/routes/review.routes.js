import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addReview, getReviews } from "../controllers/review.controllers.js";

const router = express.Router();

// Add a review (Shop, Item, Delivery)
router.post("/add", isAuth, addReview);

// Get reviews for a target
router.get("/", getReviews);

export default router;
