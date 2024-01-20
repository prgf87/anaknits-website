import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("We apologize but this product is now Out of Stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const customParams = {
    width: "400",
    height: "400",
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Product Page</Link>
      </div>
      <div className="grid md:grid-cols-5 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            {...customParams}
            className="object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>

              <div>${product.price.toFixed(2)}</div>
            </div>
            <div>Status</div>
            <div>{product.countInStock > 0 ? "In Stock" : "Unavaialble"}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
