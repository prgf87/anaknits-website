import { getToken } from "next-auth/jwt";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("Error: Sign-in required");
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  //res.send(order);
  processItemCollection(order.orderItems);

  function processItemCollection(orderProductCollection) {
    for (let i = 0; i < orderProductCollection.length; i++) {
      updateDB(
        orderProductCollection[i]._id,
        orderProductCollection[i].quantity
      );
    }
  }

  function updateDB(productId, orderProductQuantity) {
    Product.findById(
      productId,
      function (error, productsItem) {
        if (error) {
          console.log("Update Error: ", error);
        } else {
          let newCountInStock =
            productsItem.countInStock - orderProductQuantity;
          // Update DB!
          console.log(
            "Order Product ID: " +
              productId +
              ", Order Product Quantity: " +
              orderProductQuantity +
              ", Inventory Product Quantity: " +
              productsItem.countInStock +
              "newCountInStock: " +
              newCountInStock
          );
          const filter = { _id: productId };
          const update = { countInStock: newCountInStock };
          let doc = Product.findById(req.query.id).update(filter, update);
          console.log(doc._id + " = " + doc.countInStock);
        }
      }.bind(productId, orderProductQuantity)
    );
  }
  await db.disconnect();
};

export default handler;
