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
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go back to Product Page</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 md:min-h-[25rem]">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-d">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/products/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          {...customParams}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
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
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems
                    .reduce((a, c) => a + c.quantity * c.price, 0)
                    .toFixed(2)}
                </div>
              </li>
              <div className="flex flex-wrap justify-evenly mx-auto gap-4 py-4">
                <Image
                  src={"/images/visa.png"}
                  alt="visa logo"
                  width={109}
                  height={70}
                />

                <Image
                  src={"/images/mastercard.png"}
                  alt="mastercard logo"
                  width={90}
                  height={70}
                  className="h-[40px] w-[70px] object-contain"
                />

                <Image
                  src={"/images/paypal.jpg"}
                  alt="paypal logo"
                  width={120}
                  height={70}
                />
              </div>
              <li>
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
