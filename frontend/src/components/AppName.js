import React from 'react'
import { motion } from 'framer-motion';
import Logo from './Logo';

const AppName = ({ open }) => {
    return (
      <div className="mb-3 border-b border-slate-300 pb-3">
        <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
          <div className="flex items-center gap-2">
            <Logo />
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                <span className="block text-md font-semibold">Scytale</span>
              </motion.div>
            )}
          </div>
          {open}
        </div>
      </div>
    );
  };

export default AppName