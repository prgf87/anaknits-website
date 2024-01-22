import { getToken } from "next-auth/jwt";
import Order from "../../../models/Order";
import db from "../../../utils/db";
// import Product from "../../../models/Product";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("Sign-in required");
  }

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  // console.log("Order Items: ", order.orderItems);

  // for (const index in order.orderItems) {
  //   const item = order.orderItems[index];
  //   const product = await Product.findById(item.product);
  //   product.countInStock -= item.qty;
  //   await product.save();
  // }

  res.status(201).send(order);
};
export default handler;
