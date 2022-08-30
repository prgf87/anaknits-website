import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error: Sign-in required');
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
      function (err, productsItem) {
        if (err) {
          console.log('*** Error!!! ***');
          console.log(err);
        } else {
          let newCountInStock =
            productsItem.countInStock - orderProductQuantity;
          // Update DB!
          console.log(
            'Order Product ID: ' +
              productId +
              ', Order Product Quantity: ' +
              orderProductQuantity +
              ', Inventory Product Quantity: ' +
              productsItem.countInStock +
              'newCountInStock: ' +
              newCountInStock
          );
          const filter = { _id: productId };
          const update = { countInStock: newCountInStock };
          let doc = Product.findById(req.query.id).update(filter, update);
          console.log(doc._id + ' = ' + doc.countInStock);
        }
      }.bind(productId, orderProductQuantity)
    );
  }
  await db.disconnect();
};

export default handler;
