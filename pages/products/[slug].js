import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { toast } from "react-toastify";
import { CldImage } from "next-cloudinary";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="grid md:grid-cols-5 md:gap-4">
        <div className="md:col-span-2">
          <CldImage
            src={selectedImage ? selectedImage : product.image}
            width={customParams.width}
            height={customParams.height}
            sizes="100w"
            alt="/"
            fetchpriority={"high"}
            {...customParams}
            className="object-cover h-80 max-w-72"
          />
          <div className="flex flex-wrap gap-2 mt-2 justify-start">
            {/* <CldImage
              src={selectedImage ? selectedImage : product.image}
              width={customParams.width}
              height={customParams.height}
              sizes="100w"
              alt="/"
              fetchpriority={"high"}
              {...customParams}
              className="shadow-lg object-cover h-20 w-20  border-2 border-green-700/70 cursor-pointer drop-shadow-md"
            /> */}
            {product.images.toSorted().map((img, i) => {
              console.log(img);
              return (
                <div key={i}>
                  <CldImage
                    onClick={() => {
                      setSelectedImage(img);
                    }}
                    src={img}
                    width={customParams.width}
                    height={customParams.height}
                    sizes="100w"
                    alt="/"
                    fetchpriority={"high"}
                    {...customParams}
                    className="shadow-lg object-cover h-20 w-20  cursor-pointer drop-shadow-md"
                  />
                </div>
              );
            })}
          </div>
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
