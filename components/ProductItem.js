/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  const customParams = {
    width: '500px',
    height: '750px',
  };
  return (
    <div className="card mx-0 md:mx-2">
      <Link href={`/products/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            fetchpriority={'high'}
            {...customParams}
            className="rounded shadow object-cover"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-1 md:p-3 lg:p-5">
        <Link href={`/products/${product.slug}`}>
          <a>
            <h2 className="text-sm">{product.name}</h2>
          </a>
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
