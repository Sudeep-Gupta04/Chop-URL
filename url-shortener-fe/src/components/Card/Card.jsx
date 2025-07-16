import React from "react";
import "./card.css"; // Import the CSS file
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-container"
    >
      <h1 className="card-title">{title}</h1>
      <p className="card-description">{desc}</p>
    </motion.div>
  );
};

export default Card;
