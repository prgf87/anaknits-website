import mongoose from 'mongoose';

const yarnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    content: { type: String, required: true },
    colors: { type: Array, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    keywords: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

const Yarn = mongoose.models.Yarn || mongoose.model('Yarn', yarnSchema);
export default Yarn;
