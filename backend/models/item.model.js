import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required:true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: [
        "grocery",
        "food",
        "stationary",
        "dairy",
        "others"
      ],
      default: "grocery"
    },
    image: {
      type: String, // Image URL
      default: ""
    },
    availability: {
      type: Boolean,
      default: true
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    type: {
      type: String,
      enum: ["veg", "non veg"],
      required: function() {
        return this.category === "Food";
      },
      default: undefined
    }
  },
  
  { timestamps: true }
);

 const Item=mongoose.model("Item", itemSchema);
 export default Item
