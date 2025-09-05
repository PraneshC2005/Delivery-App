import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ],
    ratings: {
        type: [Number],
        default: [],
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
},{timestamps:true})




const Shop =mongoose.model("Shop",shopSchema)
export default Shop