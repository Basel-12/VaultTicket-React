import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { data, h1, h2 } from "framer-motion/client";
import { toast } from "react-toastify";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string
  availableSeats: number;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Event[]>("/api/Events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const handlebook = async (id)=>{
    try{
        const res = await axios.post(`/api/Booking/${id}`)
        toast.success('you have booked the ticket')
    }catch(err){
        toast.error(err.response.data)
    }
  }


  return (
    <>
      <NavBar />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className='bg-hero h-[60vh] bg-no-repeat w-full relative bg-cover after:content-[""] after:h-full after:absolute after:inset-0 after:bg-black after:opacity-80 z-20'
      ></motion.header>
      <Section header="Our Events">
        {loading && <h1>loading</h1>}
        {!loading && (
          <>
            <div className="overflow-hidden flex flex-col gap-5">
              {events.map((event) => {
                return (
                  <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileInView={{x: 0 , opacity: 1}}
                    viewport={{once : true}}
                    className="text-white bg-black shadow-sm  rounded-md  grid grid-cols-3 gap-3 p-3"
                    key={event.id}
                  >
                    <div className="info ">
                      <h2 className="text-4xl font-bold font-mono ">{event.title}</h2>
                      <p className="text-lg opacity-75">{event.description}</p>
                    </div>
                    <div className="date text-2xl">
                      {new Date(event.date).toDateString()}
                    </div>
                    <div className="book flex flex-col gap-3 justify-center">
                      <button onClick={()=>handlebook(event.id)} disabled={event.availableSeats <= 0} className="py-3 px-6 hover:bg-red-700 duration-700 bg-red-500 rounded-md disabled:opacity-45 disabled:cursor-not-allowed">Book </button>
                      <p>availableSeats: {event.availableSeats}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </Section>
      <Footer />
    </>
  );
}
