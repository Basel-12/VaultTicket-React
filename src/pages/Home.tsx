import Footer from "../components/Footer";
import EventsSection from "../components/Home/EventsSection";
import StatsSection from "../components/Home/StatsSection";
import NavBar from "../components/NavBar/NavBar";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      <NavBar />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className='flex items-center justify-center bg-hero min-h-[calc(100vh-20px)] bg-no-repeat w-full bg-cover after:content-[""] after:absolute after:inset-0 after:bg-black after:opacity-80 z-20'
      >
        <div className="container flex flex-col justify-center items-center z-30">
          <motion.h1
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className=" text-center text-transparent text-[80px] md:text-[100px] lg:text-[150px]  bg-gradient-to-r from-green-600 via-amber-400 to-red-800 bg-clip-text "
          >
            Vault Tickets
          </motion.h1>
          <motion.p
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-white text-2xl md:text-[80px] lg:text-[20px]  text-center mt-4"
          >
            with our expert plaining and seamless execution, we ensure every
            detail is perfect
          </motion.p>
        </div>
      </motion.header>
      <EventsSection />
      <StatsSection />
      <Footer/>
    </>
  );
}
