"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Opacidad = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <div
            ref={ref}
            style={{ position: "relative", width: "100%" }}
            className=" bg-transparent"
        >
            {/* {children} */}
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial={"hidden"}
                animate={mainControls}
                transition={{ duration: 2, delay: 0.3, type: "keyframes" }}
                className="w-full h-full flex flex-col justify-center items-center "
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Opacidad;
