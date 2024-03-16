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
      <div className="flex flex-col items-center justify-center py-1 md:py-3 lg:py-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-sm text-center px-1">{product.name}</h2>
        </Link>
        <p className="text-sm">${product.price}</p>
        <div className="relative">
          <button
            className="primary-button text-sm"
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
