// import {  } from 'react';
import { motion } from "framer-motion";

type NotFoundType = {
    message: string | 'Not Found';
};

const NotFoundMessage = ({ message }: NotFoundType) => {
  return (
    <motion.p
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 2, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
        {message} 😕
    </motion.p>
  )
}

export default NotFoundMessage;