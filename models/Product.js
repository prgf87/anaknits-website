import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategories: { type: Array, required: false },
    images: { type: [String], required: false },
    featuredImage: { type: String, required: false },
    colours: { type: [String], required: false },
    brand: { type: String, required: true },
    designer: { type: String, required: false },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    details: { type: String, required: false },
    keywords: { type: [String], required: false },
    isFeatured: { type: Boolean, default: false },
    banner: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
