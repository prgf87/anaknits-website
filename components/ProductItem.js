/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card mx-0 md:mx-2 lg:mx-5">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            fetchpriority={'high'}
            width="5000px"
            height="7500px"
            className="rounded shadow object-cover"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-1 md:p-3">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-sm md:text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="text-sm">£{product.price}</p>
        <button
          className="primary-button text-sm md:text-lg"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
