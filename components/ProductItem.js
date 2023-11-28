/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export default function ProductItem({ product, addToCartHandler }) {
  const customParams = {
    width: '400',
    height: '520',
  };
  return (
    <div className="card mx-0 md:mx-2">
      <Link href={`/products/${product.slug}`}>
        <CldImage
          src={product.image}
          width={customParams.width}
          height={customParams.height}
          sizes="100w"
          alt={product.name}
          fetchpriority={'high'}
          {...customParams}
          className="rounded shadow object-cover h-[520px] w-[400px]"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-1 md:p-3 lg:p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-sm">{product.name}</h2>
        </Link>
        <p className="text-sm">${product.price}</p>
        <button
          className="primary-button text-sm"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
