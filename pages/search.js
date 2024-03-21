import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../components/Layout";
import { XCircleIcon } from "@heroicons/react/solid";
import ProductItem from "../components/ProductItem";
import db from "../utils/db";
import Product from "../models/Product";

const PAGE_SIZE = 3;

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
  {
    name: `$201 to $1000`,
    value: `201-1000`,
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "featured",
    page = 1,
  } = router.query;

  const filterSearch = ({
    page,
    category,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (price) query.price = price;
    if (rating) query.rating = rating;
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

  const pageHandler = (page) => {
    filterSearch({ page: page + 1 });
  };

  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };

  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, the product is not available");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  // console.log("Inside Component: ", "\n", category, props.categories);

  return (
    <Layout title="Search">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <div className="my-3">
            <h2>Categories</h2>
            <select
              className="w-full"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all">All</option>
              {props.categories.map((cat) => {
                return (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <h2>Prices</h2>
            <select className="w-full" value={price} onChange={priceHandler}>
              <option value="all">All</option>
              {prices &&
                prices.map((price) => {
                  return (
                    <option key={price.value} value={price.value}>
                      {price.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="my-3">
            <h2>Ratings</h2>
            <select className="w-full" value={rating} onChange={ratingHandler}>
              <option value="all">All</option>
              {ratings.map((rating) => {
                return (
                  <option key={rating} value={rating}>
                    {rating} star {rating > 1 && "s"} & up
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              {props.products.length === 0 ? "No" : props.countProducts} Results
              {query !== "all" && query !== "" && " : " + query}
              {category !== "all" && " : " + category}
              {price !== "all" && " : Price " + price}
              {(query !== "all" && query !== "") ||
              category !== "all" ||
              price !== "all" ? (
                <button onClick={() => router.push("/search")}>
                  <XCircleIcon className="h-6 w-6 ml-2" />
                </button>
              ) : null}
            </div>
            <div>
              Sort by{" "}
              <select value={sort} onChange={sortHandler}>
                <option value="featured">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Customer Reviews</option>
                <option value="newest">Latest Arrivals</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {props.products.map((product) => (
                <div
                  key={product.name}
                  className="grid grid-cols-1 w-auto justify-between"
                >
                  <ProductItem
                    product={product}
                    key={product.slug}
                    addToCartHandler={addToCartHandler}
                  />
                </div>
              ))}
            </div>
            <ul className="flex">
              {props.products.length > 0 &&
                [...Array(props.pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page == pageNumber + 1 ? "font-bold" : ""
                      }`}
                      onClick={() => pageHandler(pageNumber)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = parseInt(query.page || 1);
  const category = query.category || "";
  const rating = query.rating || "";
  const price = query.price || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "newest"
      ? { createdAt: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "featured"
      ? { isFeatured: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
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
