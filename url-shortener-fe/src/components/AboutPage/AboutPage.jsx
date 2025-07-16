import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
import "./about.css"; // Import the CSS file

const AboutPage = () => {
  return (
    <div className="about-container">
      <div>
        <h1 className="about-header">About ChopURL</h1>
        <p className="about-text">
        ChopURL is a powerful and user-friendly URL shortening service designed to make link sharing effortless. With ChopURL, you can quickly generate short and clean URLs, making them easy to share across platforms.  

Beyond just shortening links, ChopURL provides advanced link management features, allowing users to track clicks, analyze engagement, and organize links efficiently. Whether you're a marketer, developer, or casual user, ChopURL ensures seamless link tracking and improved accessibility.  

With a focus on simplicity and efficiency, ChopURL helps optimize your link-sharing experience while maintaining reliability and security.
        </p>
        <div>
          <div className="about-section">
            <FaLink className="about-icon blue" />
            <div>
              <h2 className="about-heading">Simple URL Shortening</h2>
              <p className="about-description">
                Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup 
                process ensure you can start shortening URLs without any hassle.
              </p>
            </div>
          </div>
          <div className="about-section">
            <FaShareAlt className="about-icon green" />
            <div>
              <h2 className="about-heading">Powerful Analytics</h2>
              <p className="about-description">
                Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and
                referral sources to optimize your marketing strategies.
              </p>
            </div>
          </div>
          <div className="about-section">
            <FaEdit className="about-icon purple" />
            <div>
              <h2 className="about-heading">Enhanced Security</h2>
              <p className="about-description">
                Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your 
                data remains safe and secure.
              </p>
            </div>
          </div>
          <div className="about-section">
            <FaChartLine className="about-icon red" />
            <div>
              <h2 className="about-heading">Fast and Reliable</h2>
              <p className="about-description">
                Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be 
                available and responsive, ensuring a seamless experience for your users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
