import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData);

    try {
      const response = await fetch('https://your-backend-endpoint.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="contact-container p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Phone: +1 123-456-7890</p>
      <p className="mb-4">Email: info@example.com</p>
      <p className="mb-4">Address: 123 Main St, City, State, Zip</p>
      <p className="mb-4">Hours: Monday-Friday 9:00 AM - 5:00 PM</p>
      <p className="mb-4">We accept payments through PayPal, Venmo, or Credit Card</p>
      <p className="mb-4">We are open for business on weekends and holidays</p>

      <h2 className="text-xl font-semibold mb-4">Send Us a Query</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Send Message</button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default Contact;
