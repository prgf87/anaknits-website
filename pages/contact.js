import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function ContactPage() {
  const contactForm = () => {
    const [status, useStatus] = useState('Submit');
  };

  return (
    <Layout>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" required />
        </div>
        <button type="submit">{status}</button>
      </form>
    </Layout>
  );
}
