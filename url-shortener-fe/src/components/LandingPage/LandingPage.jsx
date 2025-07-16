import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Card from "../Card/Card.jsx";
import "./landing.css";
import { useStoreContext } from "../../contextApi/ContextApi.jsx";


const LandingPage = () => {
const dashBoardNavigateHandler = () => {

  
};

const {token} = useStoreContext();
console.log(`Token: ${token}`);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="landing-header"
          >
            ChopURL Simplifies URL Shortening For Efficient Sharing.
          </motion.h1>
          <p className="landing-text">
            ChopURL streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            ChopURL allows you to generate concise, easy-to-share URLs in
            seconds. Simplify your sharing experience with ChopURL today.
          </p>
          <div className="button-container">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="primary-button"
            >
              Manage Links
            </motion.button>
            <motion.button
                
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="secondary-button"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>
        <div className="image-container">
          <img
            className="landing-image"
            src="/img2.png" // Direct path since image is in public/
            alt="Landing"
          />
        </div>
      </div>

      <div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="trusted-text"
        >
          Trusted by individuals and teams at the world’s best companies
        </motion.p>
        <div className="card-container">
          <Card
            title="Simple URL Shortening"
            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
          />
          <Card
            title="Powerful Analytics"
            desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
          />
          <Card
            title="Enhanced Security"
            desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
          />
          <Card
            title="Fast and Reliable"
            desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
