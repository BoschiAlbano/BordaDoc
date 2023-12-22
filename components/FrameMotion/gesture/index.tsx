"use client";

import React from "react";
import { motion } from "framer-motion";
const Gesture = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            className=" h-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    );
};

export default Gesture;
