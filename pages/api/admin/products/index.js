import Product from "../../../../models/Product";
import db from "../../../../utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send("Error: Admin sign-in is Required");
  }

  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "POST") {
    return postHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Error: Method not allowed" });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "Product name",
    slug: "sample-name-" + Math.random(),
    image: "Upload image using the link below",
    images: [],
    price: 0,
    category: "Product item category",
    subcategories: "...",
    brand: "Ana Knits",
    designer: "A. M. M. Guimaraes",
    countInStock: 0,
    description: "Give this item a nice description",
    keywords: [],
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "The product was created successfully", product });
};

export default handler;
