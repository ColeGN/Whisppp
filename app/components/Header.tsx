'use client'

import { motion } from 'framer-motion';

const AnimatedHeader = () => {
  return (
    <motion.h1 
      className="text-5xl md:text-7xl font-extrabold text-white mb-6 text-center leading-tight"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        At Whispp,
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        you have the freedom
      </motion.span>{" "}
      <br className="hidden md:inline"/>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        to express yourself
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
      >
        —no filters, no limits.
      </motion.span>
    </motion.h1>
  );
};

export default AnimatedHeader;

