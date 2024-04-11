import Image from "next/image";
import React from "react";

function Payment() {
  return (
    <div>
      <h5 className="font-bold mt-4 mb-4 md:text-center">
        We accept the following forms of payment:
      </h5>
      <div className="flex justify-center items-center gap-8">
        <Image
          src={"/images/visa.png"}
          alt="visa logo"
          width="137"
          height="88"
          fixed="true"
          className="h-[7vh] w-[7vw] object-contain"
        />

        <Image
          src={"/images/mastercard.png"}
          alt="mastercard logo"
          width="151"
          height="117"
          className="h-[7vh] w-[7vw] object-contain"
        />

        <Image
          src={"/images/paypal.jpg"}
          alt="paypal logo"
          width="1457"
          height="851"
          className="h-[7vh] w-[7vw] object-contain"
        />
      </div>
    </div>
  );
}

export default Payment;
