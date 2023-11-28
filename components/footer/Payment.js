import Image from 'next/image';
import React from 'react';

function Payment() {
  return (
    <div>
      <h5 className="font-bold mt-10 mb-2">
        We accept the following types of payment:
      </h5>
      <div className="flex justify-start items-center gap-8">
        <Image
          src={'/images/visa.png'}
          alt="visa logo"
          width={109}
          height={70}
        />

        <Image
          src={'/images/mastercard.png'}
          alt="mastercard logo"
          width={90}
          height={70}
          className="h-[40px] w-[70px] object-contain"
        />

        <Image
          src={'/images/paypal.jpg'}
          alt="paypal logo"
          width={120}
          height={70}
        />
      </div>
    </div>
  );
}

export default Payment;
