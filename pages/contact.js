// <<<<<<< HEAD
// import React, { useState } from 'react';
// import Layout from '../components/Layout';
// import { useForm } from 'react-hook-form';

// export default function ContactPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [register, handleSubmit] = useForm();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const data = {
//       name,
//       email,
//       message,
//     };
//     fetch('/api/contact', {
//       method: 'post',
//       body: JSON.stringify(data),
//     });
//     console.log(data);
//   };

//   return (
//     <Layout>
//       <div>
//         <div className="flex w-full min-h-screen justify-center py-5">
//           <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-cyan-600 w-full max-w-4xl p-5 sm:p-8 rounded-lg shadow-lg text-white overflow-hidden">
//             <div className="flex flex-col md:flex-1 space-y-8 justify-between">
//               <div>
//                 <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
//                 <p className="pt-2 text-blue-100 text-sm">
//                   Don&apos;t want to send a message through our service? You can
//                   contact us directly by going to our social media sites or
//                   using the contact email below.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-4 sm:space-y-6">
//                 <div className="inline-flex space-x-2 items-center">
//                   <ion-icon
//                     name="mail"
//                     className="text-blue-300 text-xl"
//                   ></ion-icon>
//                   <span>info@anaknits.com</span>
//                 </div>
//                 <div className="inline-flex space-x-2 items-center">
//                   <ion-icon
//                     name="location"
//                     className="text-blue-300 text-xl"
//                   ></ion-icon>
//                   <span>Georgia, USA</span>
//                 </div>
//               </div>
//               <div className="flex space-x-4 text-lg">
//                 <a href="#">
//                   <ion-icon name="logo-facebook"></ion-icon>
//                 </a>
//                 <a href="#">
//                   <ion-icon name="logo-twitter"></ion-icon>
//                 </a>
//                 <a href="#">
//                   <ion-icon name="logo-linkedin"></ion-icon>
//                 </a>
//                 <a href="#">
//                   <ion-icon name="logo-instagram"></ion-icon>
//                 </a>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="absolute invisible md:visible z-0 w-40 h-40 bg-cyan-400 rounded-full -right-14 -top-14"></div>
//               <div className="absolute invisible md:visible z-0 w-40 h-40 bg-cyan-400 rounded-full -left-14 -bottom-16"></div>
//               <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-full">
//                 <form
//                   onSubmit={handleSubmit(submitHandler)}
//                   className="flex flex-col space-y-4"
//                 >
//                   <div>
//                     <label htmlFor="Name" className="text-sm">
//                       Your Full Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       {...register('fullName', {
//                         required: true,
//                         maxLength: 25,
//                       })}
//                       onChange={(e) => setName(e.target.value)}
//                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="text-sm">
//                       Your Email
//                     </label>
//                     <input
//                       type="email"
//                       {...register('email', {
//                         required: 'Please enter your email address',
//                         pattern: {
//                           value:
//                             /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
//                           message: 'Please enter a valid email address!',
//                         },
//                       })}
//                       placeholder="Email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="message" className="text-sm">
//                       Your Message
//                     </label>
//                     <textarea
//                       type="email"
//                       placeholder="Message"
//                       rows="4"
//                       onChange={(e) => setMessage(e.target.value)}
//                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="inline-block self-end bg-cyan-600 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
// =======
import Link from 'next/link';
import React from 'react';
import ContactUs from '../components/ContactUs';
import Layout from '../components/Layout';

export default function ContactUsPage() {
  return (
    <Layout>
      <ContactUs />
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
