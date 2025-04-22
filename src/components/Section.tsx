import React from "react";
import { motion } from "framer-motion";
export default function Section({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <motion.section className="py-20 overflow-hidden">
      <motion.h2
        initial={{ x: 600, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{once:true}}
        className="w-full mb-10 text-white text-3xl md:text-5xl font-mono flex items-center justify-center relative"
      >
        {header}
      </motion.h2>
      <div className="container justify-center">{children}</div>
    </motion.section>
  );
}
