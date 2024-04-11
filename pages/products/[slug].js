import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
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
  const imageSource = selectedImage ? selectedImage : product.featuredImage;

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const productImageIndex = () => {
    let index = product.images.findIndex((i) => i === imageSource);
    return index;
  };

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

  const imageColour = product.colours[productImageIndex()];

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
            src={imageSource}
            width={customParams.width}
            height={customParams.height}
            sizes="100w"
            alt="/"
            fetchpriority={"high"}
            {...customParams}
            className="object-cover h-72 max-w-[300px]"
          />
          Colour: {imageColour}
          <div className="flex flex-wrap gap-2 mt-2 justify-between w-[300px]">
            {product.images &&
              product.images.toSorted().map((img, i) => {
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
                      className="shadow-lg object-cover h-[68px] w-[68px]  cursor-pointer drop-shadow-md hover:scale-105 transition-transform duration-150 ease-in-out"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="md:col-span-2 text-base pt-4">
          <ul>
            <li>
              <h1 className="text-xl font-bold">{product.name}</h1>
            </li>
            <li>
              <b>Category: </b>
              {product.category}
            </li>
            <li>
              <b>Brand: </b>
              {product.brand}
            </li>
            <li className="whitespace-pre text-wrap">
              <b>Description: </b> {product.description}
            </li>
          </ul>
        </div>
        <div>
          <div className="flex gap-1 py-2">
            <h6>Status</h6>
            <div
              className={`${
                product.countInStock > 0 ? "text-green-500 font-bold" : ""
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Unavaialble"}
            </div>
          </div>
          <div className="card p-4">
            <div className="flex justify-between">
              <div>Price</div>

              <div>${product.price.toFixed(2)}</div>
            </div>
          </div>

          <div className="pb-4">
            <select id="colours" name="colours" className="w-full text-sm">
              {product.colours.map((col) => {
                return (
                  <option key={col} value={col}>
                    {col}
                  </option>
                );
              })}
            </select>
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
