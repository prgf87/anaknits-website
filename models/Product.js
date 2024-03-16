import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subcategories: { type: Array, required: false },
    image: { type: String, required: true },
    images: {type: [String], required: false},
    featuredImage: {type: String, required: false },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    designer: { type: String, required: false },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    keywords: { type: [String], required: false },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
