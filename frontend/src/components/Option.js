import React from 'react'
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'


const Option = ({ Icon, title, selected, setSelected, open, href }) => {
    return (
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-blue-100 text-blue-950" : "text-slate-500 hover:bg-slate-100"}`}
      >
      <Link to = {href} className="flex w-full items-center">
  
      
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
  
        { open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
          </motion.span>
        )}
        </Link>
      </motion.button>
    );
};

export default Option