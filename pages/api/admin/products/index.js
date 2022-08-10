import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Error: Admin sign-in is Required');
  }
  //const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Error: Method not allowed' });
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
    name: 'Product name',
    slug: 'sample-name-' + Math.random(),
    image: 'Upload image using the link below',
    price: 0,
    category: 'Product item catergory',
    brand: 'Anaknits',
    countInStock: 0,
    description: 'Give this item a nice description',
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'This product has been created successfully', product });
};

export default handler;
