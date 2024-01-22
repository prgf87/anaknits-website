import React, { useState } from "react";

export default function ContactUs() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const [buttonText, setButtonText] = useState("Send");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
      setFullname("");
      setEmail("");
      setMessage("");
      setSubject("");
    }
    // console.log(fullname, email, subject, message);
  };
  return (
    <div>
      <div className="flex w-full min-h-[75%] justify-center py-5">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-slate-500 w-full max-w-4xl p-5 sm:p-8 rounded-lg shadow-lg text-white overflow-hidden">
          <div className="flex flex-col md:flex-1 space-y-8 justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
              <p className="pt-2 text-gray-100 text-lg">
                Don&apos;t want to send a message through our service? &nbsp;
                <br></br>
                <br></br>
                You can contact us directly by going to our social media sites
                or using the contact email below.
                <br></br>
                <br></br>
                What ever the problem is, we aim to do our best to get back to
                you as soon as we can.
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="inline-flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@anaknits.com</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Georgia, USA</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute invisible md:visible z-0 w-40 h-40 bg-slate-300 rounded-full -right-14 -top-14"></div>
            <div className="absolute invisible md:visible z-0 w-40 h-40 bg-slate-300 rounded-full -left-14 -bottom-16"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-slate-600 md:w-full">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h1 className="text-2xl font-bold dark:text-gray-50">
                  Send us a message
                </h1>
                <div>
                  <label htmlFor="Name" className="text-sm">
                    Full Name
                    <span className="text-red-500 dark:text-gray-50">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors?.fullname && (
                    <p className="text-red-500">Full Name cannot be empty.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm">
                    Your Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors?.email && (
                    <p className="text-red-500">Email cannot be empty.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="Subject" className="text-sm">
                    Subject<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors?.subject && (
                    <p className="text-red-500">Subject cannot be empty.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="text-sm">
                    Your Message<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors?.message && (
                    <p className="text-red-500">
                      Message body cannot be empty.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-block self-end bg-gray-500 text-white font-bold rounded-lg px-8 py-2 uppercase text-sm"
                >
                  {buttonText}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-cyan-500 ml-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <div className="text-left">
                  {showSuccessMessage && (
                    <p className="text-green-500 font-semibold text-sm my-2">
                      Thank you for getting in touch! Your message has been
                      successfully delivered and we will reply as soon as
                      possible.
                    </p>
                  )}
                  {showFailureMessage && (
                    <p className="text-red-500">
                      Oops! Something went wrong, please try again later or get
                      in contact directly by sending an email to
                      info@anaknits.com or by visiting our social media.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
