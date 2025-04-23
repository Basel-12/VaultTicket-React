import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";

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

  return (
    <>
      <NavBar relative/>
        <section className="">
            <div className="container flex items-center">

            </div>
        </section>
      <Footer />
    </>
  );
}
