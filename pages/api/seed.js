// import Product from "../../models/Product";
// import User from '../../models/User';
// import data from '../../utils/dataNew';
// import Order from "../../models/Order";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  // await Order.deleteMany();
  await db.disconnect();
  res.send({ message: "Seeded successfully" });
};
export default handler;
