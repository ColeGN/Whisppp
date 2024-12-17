'use client'

import { motion } from 'framer-motion';
import StoriesCard from "./StoriesCard";
import { StoriesTypeCard } from "./StoriesCard";

const AnimatedGrid = ({ posts }: { posts: StoriesTypeCard[] }) => {
  return (
    <motion.ul 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {posts?.length > 0 ? (
        posts.map((post: StoriesTypeCard) => (
          <motion.li 
            key={post?._id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transform transition-all duration-300 ease-in-out"
          >
            <StoriesCard post={post} />
          </motion.li>
        ))
      ) : (
        <motion.p 
          className="col-span-full text-center text-xl text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No stories found
        </motion.p>
      )}
    </motion.ul>
  );
};

export default AnimatedGrid;

