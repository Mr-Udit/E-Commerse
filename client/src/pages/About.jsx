import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4 text-center">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to <span className="font-semibold text-blue-600">E-Commerce</span>! Our mission is to provide a seamless online shopping experience with a wide range of products, secure payments, and fast delivery. We are passionate about connecting customers with quality goods and excellent service.
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Project Details</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Modern React-based frontend with TailwindCSS for styling</li>
            <li>Robust product catalog and search functionality</li>
            <li>Secure user authentication and order management</li>
            <li>Responsive design for all devices</li>
            <li>Integrated with reliable payment gateways</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 bg-purple-50 rounded-lg p-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Admin"
            className="w-20 h-20 rounded-full border-4 border-purple-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-purple-800">Admin: John Doe</h3>
            <p className="text-gray-600">
              John is a passionate developer and entrepreneur dedicated to building user-friendly digital experiences. With expertise in web development and e-commerce, he ensures the platform runs smoothly and securely for all users.
            </p>
            <a
              href="mailto:admin@ecommerce.com"
              className="inline-block mt-2 text-blue-500 hover:underline"
            >
              Contact Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
