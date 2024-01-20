import { getToken } from "next-auth/jwt";
import Order from "../../../../../models/Order";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send("Error: Admin sign-in is Required");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({
      message: "The order has been delivered successfully",
      order: deliveredOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Error: order not found" });
  }
};

export default handler;
