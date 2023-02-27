import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    value: Number,
    description: Text,
    stockQuantity: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;