// import { getSession } from 'next-auth/react';
// import Order from '../../../models/Order';
// import Product from '../../../models/Product';
// import db from '../../../utils/db';

// const handler = async (req, res) => {
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).send('Error: Sign-in required');
//   }
//     const { user } = session;
//     if (req.method === 'GET') {
//       return getHandler(req, res, user);
//     } else if (req.method === 'PUT') {
//       return putHandler(req, res, user);
//     } else if (req.method === 'DELETE') {
//       return deleteHandler(req, res, user);
//     } else {
//       return res.status(400).send({ message: 'Method not allowed' });
//     }
//   };

//   await db.connect(req, res);

//   const { data } = req.query.body;

//   const order = data;
//   const product = data.item._id;
//   if (order.isPaid === true) {
//     product.forEach(_id => {
//       Product.findByIdAndUpdate(_id, { product.stockInCount = data.item.quantity }, req, res, error)

//     });

//     }
// order.isPaid = true;
// order.paidAt = Date.now();
// order.paymentResult = {
//   id: req.body.id,
//   status: req.body.status,
//   email_address: req.body.email_address,
// }
// };
// const paidOrder = await order.save();
//     await db.disconnect();
//     res.send({
//       message: 'Your order has been paid successfully',
//       order: paidOrder,
//     });
//   } else {
//     await db.disconnect();
//     res.status(404).send({ message: 'Error: order is not found' });
//   }
// };

// import { getSession } from 'next-auth/react';
// import Product from '../../../../../models/Product';
// import db from '../../../../../utils/db';

// const handler = async (req, res) => {
//   const session = await getSession({ req });
//   if (!session || (session && !session.user.isAdmin)) {
//     return res.status(401).send('Error: Admin sign-in is Required');
//   }
//   const { user } = session;
//   if (req.method === 'GET') {
//     return getHandler(req, res, user);
//   } else if (req.method === 'PUT') {
//     return putHandler(req, res, user);
//   } else if (req.method === 'DELETE') {
//     return deleteHandler(req, res, user);
//   } else {
//     return res.status(400).send({ message: 'Method not allowed' });
//   }
// };

// const getHandler = async (req, res) => {
//   await db.connect();
//   const product = await Product.findById(req.query.id);
//   await db.disconnect();
//   res.send(product);
// };

// const putHandler = async (req, res) => {
//   await db.connect();
//   const product = await Product.findById(req.query.id);
//   if (product) {
//     product.name = req.body.name;
//     product.slug = req.body.slug;
//     product.price = req.body.price;
//     product.category = req.body.category;
//     product.image = req.body.image;
//     product.images = req.body.images;
//     product.brand = req.body.brand;
//     product.countInStock = req.body.countInStock;
//     product.description = req.body.description;
//     await product.save();
//     await db.disconnect();
//     res.send({ message: 'Product has been updated successfully!' });
//   } else {
//     await db.disconnect();
//     res.status(404).send({ message: 'Error: Product not found' });
//   }
// };

// const deleteHandler = async (req, res) => {
//   await db.connect();
//   const product = await Product.findById(req.query.id);
//   if (product) {
//     await product.remove();
//     await db.disconnect();
//     res.send({ message: 'This product has been deleted' });
//   } else {
//     await db.disconnect();
//     res.status(404).send({ message: 'Product cannot be found' });
//   }
// };
// export default handler;
