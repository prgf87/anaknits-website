import Link from "next/link";
import React from "react";

function Newsletter() {
  return (
    <div id="newsletter" className="gap-[5px]">
      <h3 className="uppercase font-bold">sign up to our newsletter</h3>
      <div className="grid sm:flex justify-center items-center">
        <input
          type="text"
          placeholder="Your email address..."
          className="h-full w-[100%] bg-transparent pl-[1rem] py-2 border border-[#999]"
        />
        <div className="w-full sm:w-[160px]">
          <button className="btn1">Subscribe</button>
        </div>
      </div>
      <div className="flex pt-2">
        <p>
          By clicking the <u>subscribe</u>
          &nbsp;button, you are agreeing to our&nbsp;
          <Link
            href={"/policies/privacy"}
            className="text-blue-500 hover:text-blue-300 hover:underline"
          >
            Privacy Policy
          </Link>
          &nbsp;&&nbsp;
          <Link
            href={"/policies/cookies"}
            className="text-blue-500 hover:text-blue-300 hover:underline"
          >
            Cookie Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Newsletter;
