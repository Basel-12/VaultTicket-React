import { motion } from "framer-motion";
import { tr } from "framer-motion/client";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="overflow-hidden py-20 bg-black">
      <div className="container grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="col text-center"
        >
            <h3 className="logo text-3xl font-mono text-white">Bokkings</h3>
            <p className="text-white text-sm mt-3 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt assumenda accusantium cumque </p>
        </motion.div>
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="col text-center"
        >
            <h3 className="logo text-4xl  text-white">Pages</h3>
           <ul className="mt-5 flex flex-col gap-1">
            <Link to={'/'} className="text-gray-500 text-xl "> Home</Link>
            <Link to={'/mybookings'} className="text-gray-500 text-xl "> Bookings</Link>
            <Link to={'/events'} className="text-gray-500 text-xl "> Events</Link>
           </ul>
        </motion.div>
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="col"
        >
            <h3 className="logo text-3xl font-mono text-white">Bokkings</h3>
            <p className="text-white text-md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt assumenda accusantium cumque </p>
        </motion.div>
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="col"
        >
            <h3 className="logo text-3xl font-mono text-white">Bokkings</h3>
            <p className="text-white text-md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt assumenda accusantium cumque </p>
        </motion.div>
      </div>
    </footer>
  );
}
