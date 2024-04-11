import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { CldImage } from "next-cloudinary";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry, the product is not available");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    return toast.success("Product has been updated to the cart");
  };

  const customParams = {
    width: "50",
    height: "50",
  };

  return (
    <Layout title={"Shopping Cart"}>
      <h1 className="mb-4 pt-16 md:pt-0 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go back to Product Page</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-5 min-h-[25rem]">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-d">
                <tr>
                  <th className="pr-40 text-left">Item</th>

                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td className="flex items-start">
                      <Link
                        href={`/products/${item.slug}`}
                        className="flex items-center"
                      >
                        <CldImage
                          src={item.featuredImage}
                          alt={item.name}
                          {...customParams}
                          className="min-w-10"
                        />
                      </Link>
                      <p className="ml-2">{item.name}</p>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-5 text-right">${item.price.toFixed(2)}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-lg">
                  <h1 className="font-bold text-left">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  </h1>
                  <p className="text-left">
                    $
                    {cartItems
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </li>

              <li className="pt-8">
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center m-auto pt-5">
        <button className="sidebarLinkButton border-2 border-black hover:focus-cyan-500">
          <Link href={"/search"} className="text-black">
            Browse more Products
          </Link>
        </button>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
