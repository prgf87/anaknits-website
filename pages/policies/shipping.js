import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function ShippingPolicyPage() {
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-xl py-2">Shipping Policy</h1>
        <h2 className="font-bold text-lg">
          What is the total delivery time for my order?
        </h2>
        <p>
          All orders are processed in 2-3 business days. For large parcels,
          processing time may extend upto 4 days. Orders are not processed
          during holidays or weekends.
        </p>

        <p>
          The estimated delivery time of your order depends on the shipping
          method that you choose during checkout.
        </p>

        <p>
          <u>
            Here are the shipping charges and speed of delivery for domestic
            deliveries:
          </u>
        </p>
        <div className="p-5">
          <table className="w-full justify-evenly sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="border-2">
              <tr className="border-2">
                <td className="border-2 p-2">Shipping Method</td>
                <td className="border-2 p-2">Shipping Cost</td>
                <td className="border-2 p-2">Delivery Estimate</td>
              </tr>
            </thead>
            <tbody className="border-2">
              <tr className="border-2">
                <td className="border-2 p-2">FedEx Standard/UPS Ground</td>
                <td className="border-2 p-2">Free</td>
                <td className="border-2 p-2">3-5 business days</td>
              </tr>
              <tr>
                <td className="border-2 p-2">FedEx 2 days/UPS 2nd day AM</td>
                <td className="border-2 p-2">$15.85</td>
                <td className="border-2 p-2">2 business days</td>
              </tr>
              <tr>
                <td className="border-2 p-2">FedEx Overnight/UPS Next Day</td>
                <td className="border-2 p-2">$23.45</td>
                <td className="border-2 p-2">1 business day</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Delays may occurr during peak season.</strong>
          </p>
        </div>

        <h2 className="font-bold text-lg">
          Which locations do you deliver to?
        </h2>

        <p>
          We ship all orders to anywhere world-wide, please send us an email
          before making an order for places outside the United States, Alaska,
          Hawaii and Puerto Rico. Thank you for you understanding.
        </p>

        <h1 className="font-bold text-xl py-2">
          How do I check the status of my order?
        </h1>
        <p>
          You will receive an email notification with your order details and
          estimated arrival date including a tracking number. You may also track
          your order status from your User Profile page on our website.
        </p>
        <h1 className="font-bold text-xl py-2">
          What should I do if the tracking number I receive is not working?
        </h1>
        <p>
          We ensure our delivery alerts help you stay on top of orders. If the
          tracking number does not work, we recommend you try tracking with
          order number. Alternatively, you may contact our customer service team
          on <Link href="mailto:info@anaknits.com">info@anaknits.com</Link>
        </p>
        <h1 className="font-bold text-xl py-2">
          What can I do if I don&apos;t receive my order?
        </h1>
        <p>
          If you don&apos;t receive your order at the estimated time, it could
          mean either your order is delayed or is lost. You may contact our
          support team to know the exact location of your order.
        </p>
        <h1 className="font-bold text-xl py-2">
          What should I do if I receive a damaged item?
        </h1>
        <p>
          Allof your products are handmade with great care and attention to
          detail. In the unlikely event that you received a damaged good, you
          may send our customer service team a message telling us the item was
          received damaged and upload a picture of the damaged item. Once your
          request is received, we will investigate this with courier used and
          return to you with a final decision. Alternately, you could contact
          our customer service team.
        </p>
        <h1 className="font-bold text-xl py-2">
          What are the shipping timelines for international delivery?
        </h1>
        <p>
          International orders will arrive in 5-14 business days from the
          receipt of your order. You will receive shipping estimates at the time
          of checkout or in the email confirming your order.
        </p>
        <h1 className="font-bold text-xl py-2">What duties and taxes apply?</h1>
        <p>
          Shipping costs for international orders will include international
          taxes, duties and value-added tax. At the time of checkout, please
          send us an email to info@anaknits.com so that we can give you a
          correct cost for your order. Thank you for your understanding.
        </p>
        <h1 className="font-bold text-xl py-2">How can I return the item?</h1>
        <p>
          Return an item is simple. Log into dispute management portal on our
          shopping site, mark the dispute as return and upload a picture of item
          that you wish to return. You may also choose from the various return
          options. Once your request is received, our delivery agent will pick
          up your package. For detailed information, read our returns policy.
        </p>
        <h1 className="font-bold text-xl py-2">Contact Us</h1>
        <p>
          If you have any questions about our Returns and Refunds Policy, please
          contact us:
        </p>
        <ul>
          <li>
            <p>By email: info@anaknits.com</p>
          </li>
          <li>
            <p>
              By visiting this page on our website:{' '}
              <Link
                href="https://www.anaknits.com/contact"
                rel="external nofollow noopener noreferrer"
                target="_blank"
              >
                https://www.anaknits.com/contact
              </Link>
            </p>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
