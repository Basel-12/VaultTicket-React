import CountUp from "react-countup";
import Section from "../Section";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <Section header="our Stats this Year">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="w-full flex flex-col md:flex-row justify-around items-center text-white gap-4 backdrop-blur-lg md:shadow-md shadow-white  p-5 md:rounded-full text-6xl"
      >
        <CountUp startVal={0} end={35} duration={6} delay={2} />
        <CountUp startVal={0} end={20} duration={6} delay={2} />
        <CountUp startVal={0} end={14} duration={6} delay={2} />
      </motion.div>
    </Section>
  );
}
