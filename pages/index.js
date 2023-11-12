import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';

import Link from 'next/link';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, this product is now out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product has been added to your cart');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
      <div className="w-full flex justify-center m-auto pt-5">
        <button className="sidebarLinkButton border-2 border-black hover:focus-cyan-500">
          <Link href={'/search'}>
            <a className="text-black">Browse more Products</a>
          </Link>
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find().lean().limit(12);
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
