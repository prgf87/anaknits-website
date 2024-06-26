/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export const customParams = {
  width: '500',
  height: '500',
};

export default function ProductItem({ product, addToCartHandler }) {
  // console.log(product.isFeatured);
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`} className="relative">
        <CldImage
          src={product.featuredImage}
          width={customParams.width}
          height={customParams.height}
          sizes="100w"
          alt={product.name}
          fetchpriority={'high'}
          {...customParams}
          className="rounded-t shadow-md object-cover h-[300px]"
        />
        <div className="absolute bg-[#1b5f74]/70 text-gray-100 rounded-b overflow-hidden text-center bottom-0 flex-col w-full text-xs py-2">
          <p className="font-semibold">
            <span className="border border-gray-100 rounded-full py-[2px] px-[6px]">
              {product.colours.length}
            </span>
            &nbsp;Colours
          </p>
        </div>
      </Link>
      <div className="flex flex-col flex-1 items-center justify-center py-1 md:py-2 lg:py-4 px-4 text-sm text-center">
        <h2 className="font-bold pt-2 px-1 text-ellipsis">{product.name}</h2>
        <div className="flex-1">
          <p className="font-light py-2 px-1 text-ellipsis">
            {product.details}
          </p>
          <p className="font-bold pb-2">${product.price.toFixed(2)}</p>
          <div className="relative w-full px-4">
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
    </div>
  );
}
