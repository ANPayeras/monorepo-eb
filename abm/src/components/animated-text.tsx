import React from 'react'
import { motion } from "framer-motion";

const AnimatedText = ({ text }: { text: string }) => {
    return (
        <motion.h3
            initial={{ opacity: 0.5, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-500 to-slate-900 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent"
        >
            {text}
        </motion.h3>
    )
}

export default AnimatedText