import axios from 'axios';
import Link from 'next/link';
import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CldImage } from 'next-cloudinary';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

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
      <Carousel responsive={responsive} showDots={false}>
        {featuredProducts.map((product) => {
          return (
            <div key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <CldImage
                  src={product.featuredImage}
                  alt={product.name}
                  width={1920}
                  height={1080}
                  className="h-80 object-cover"
                  priority
                />
              </Link>
            </div>
          );
        })}
      </Carousel>
      <h2 className="my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 pt-16 md:pt-0">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
      <div className="w-full flex justify-center m-auto pt-4">
        <button className="sidebarLinkButton border-2 border-black hover:focus-cyan-500">
          <Link href={'/search'} className="text-black">
            Browse more Products
          </Link>
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find().lean().limit(12);
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  console.log('HERE: ', featuredProducts);
  return {
    props: {
      products: products.map(db.convertDocToObj),
      featuredProducts: featuredProducts.map(db.convertDocToObj),
    },
  };
}
