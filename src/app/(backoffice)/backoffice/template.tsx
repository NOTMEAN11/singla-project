"use client";
import React from "react";
import { motion } from "framer-motion";

function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // exit={{ opacity: 0 }}
    // transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default Template;
