/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export const customParams = {
  width: "400",
  height: "520",
};

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card mx-0 md:mx-2">
      <Link href={`/products/${product.slug}`}>
        <CldImage
          src={product.image}
          width={customParams.width}
          height={customParams.height}
          sizes="100w"
          alt={product.name}
          fetchpriority={"high"}
          {...customParams}
          className="rounded shadow-lg object-cover h-[400px] w-[350px]"
        />
      </Link>
      <div className="flex flex-col items-center justify-between py-1 md:py-3 lg:py-5 h-40">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-bold text-center pt-2 px-1 text-ellipsis">
            {product.name}
          </h2>
        </Link>
        <div className="relative">
          <p className="text-bold text-center pb-2">${product.price}</p>
          <button
            className="primary-button text-sm mb-2"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
