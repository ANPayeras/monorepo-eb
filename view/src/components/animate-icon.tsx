import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion";

const variants = {
    start: () => ({
        rotate: [10, -10, 0],
        transition: {
            duration: 0.5,
        }
    }),
};

const AnimateIcon = ({ children, active }: { children: JSX.Element, active: boolean }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (active) controls.start("start");
    }, [active, controls])

    return (
        <motion.div
            variants={variants}
            animate={controls}
        >
            {children}
        </motion.div>
    )
}

export default AnimateIcon