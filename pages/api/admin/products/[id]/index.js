import { getToken } from "next-auth/jwt";
import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send("Error: Admin sign-in is Required");
  }

  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.image = req.body.image;
    product.images = req.body.images;
    product.featuredImage = req.body.featuredImage;
    product.colours = req.body.colours;
    product.category = req.body.category;
    product.subcategories = req.body.subcategories;
    product.keywords = req.body.keywords;
    product.brand = req.body.brand;
    product.designer = req.body.designer;
    product.description = req.body.description;
    product.details = req.body.details;
    product.isFeatured = req.body.isFeatured;
    await product.save();
    await db.disconnect();
    res.send({ message: "Product has been updated successfully!" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Error: Product not found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: "This product has been deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product cannot be found" });
  }
};
export default handler;
