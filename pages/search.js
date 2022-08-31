import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import ProductItem from '../components/ProductItem';
import { Store } from '../utils/Store';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 4;

const prices = [
  {
    name: `$1 to $25`,
    value: `1-25`,
  },
  {
    name: `$26 to $50`,
    value: `26-50`,
  },
  {
    name: `$51 to $100`,
    value: `51-100`,
  },
  {
    name: `$101 to $150`,
    value: `101-150`,
  },
  {
    name: `$151 to $200`,
    value: `101-200`,
  },
];

export default function Search(props) {
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    price = 'all',
    sort = 'featured',
  } = router.query;

  const { products, countProducts, categories, pages } = props;

  const filterSearch = ({
    page,
    category,
    sort,
    min,
    max,
    searchQuery,
    price,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (price) query.price = price;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (_e) => {
    const page = _e.selected + 1;
    filterSearch({ page });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, the product is not available');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product has been added to your cart');
  };

  return (
    <Layout title="Search">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 mx-5 gap-10 h-auto md:max-h-[50px] mb-3">
          <div className="w-full">
            <h1 className="flex text-sm justify-center">Categories</h1>
            <div className="flex justify-center">
              <div className="mb-3">
                <select
                  value={category}
                  onChange={categoryHandler}
                  className="
                      form-select 
                      block
                      w-[125px] md:w-[142px] lg:w-[224px]                   
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid 
                      border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-auto
                      focus:text-gray-700 
                      focus:bg-white focus:border-cyan-700 focus:outline-none"
                  aria-label="Select Category"
                >
                  <option selected value="all">
                    All
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="container w-full">
            <h1 className="flex text-sm justify-center">Price</h1>
            <div className="flex justify-center">
              <div className="mb-3">
                <select
                  value={price}
                  onChange={priceHandler}
                  className="
                      form-select 
                      block
                      w-[125px] md:w-[142px] lg:w-[224px]                      
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid 
                      border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-auto
                      focus:text-gray-700 
                      focus:bg-white focus:border-cyan-700 focus:outline-none"
                  aria-label="Select Price"
                >
                  <option selected value="all">
                    All
                  </option>
                  {prices &&
                    prices.map((price) => (
                      <option key={price.value} value={price.value}>
                        {price.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="container w-full max-h-20">
            <h1 className="flex text-sm justify-center">Sort By</h1>
            <div className="flex justify-center">
              <div className="mb-3">
                <select
                  value={sort}
                  onChange={sortHandler}
                  className="
                      form-select 
                      block
                      w-[125px] md:w-[142px] lg:w-[224px]                    
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid 
                      border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-auto
                      focus:text-gray-700 
                      focus:bg-white focus:border-cyan-700 focus:outline-none"
                  aria-label="Sort By"
                >
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex text-sm justify-center w-auto">
            <h1>
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {price !== 'all' && ' : Price ' + price}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              price !== 'all' ? (
                <button
                  onClick={() => router.push(`/search`)}
                  className="flex justify-center pl-1 pr-1 m-auto text-black-700 px-[10px] rounded-full hover:bg-red-600 border-4 border-black bg-red-400 hover:border-gray-700 w-[125px] md:w-[142px] lg:w-[224px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : null}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid w-full h-auto grid-cols-1 md:grid-cols-4 mx-auto">
        {products.map((product) => (
          // eslint-disable-next-line react/jsx-key
          <div className="grid grid-cols-1 w-auto justify-between">
            <div key={product.name}>
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <ReactPaginate
          pageCount={pages}
          pageRangeDisplayed={0}
          previousLabel="<"
          nextLabel=">"
          breakLabel={'...'}
          onPageChange={pageHandler}
          intialPage={parseInt(query.page || '1')}
          previousClassName={
            'block py-2 px-3 leading-tight text-gray-500 bg-white  rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          }
          nextClassName={
            'block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          }
          containerClassName={'inline-flex items-center -space-x-px'}
          pageClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          activeLinkClassName="bg-gray-100 text-black border border-2 border-gray-400 rounded-full px-4 py-2"
          breakClassName={'breakMe'}
          breakLinkClassName={'breakLink'}
          disabledClassName
          disabledLinkClassName
          cursor-pointer
          renderOnZeroPageCount={null}
        ></ReactPaginate>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = parseInt(query.page || 1);
  const category = query.category || '';
  const price = query.price || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};

  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'newest'
      ? { createdAt: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const productDocs = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);
  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
