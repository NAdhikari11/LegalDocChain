import React from 'react'
import { motion } from 'framer-motion';
import logo from '../images/OnlyLogo.png'

const Logo = () => {
    return (
      <motion.div
        layout
        className="grid size-10 place-content-center rounded-md "
      >
        <img className="h-auto" src = {logo} alt = "logo" />
      </motion.div>
    );
  };
  

export default Logo