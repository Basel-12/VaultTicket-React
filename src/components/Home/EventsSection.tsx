import Section from "../Section";
import { motion } from "framer-motion";

interface EventItem {
  name: string;
  image: string;
}

type Columns = EventItem[][];

const coloumns: Columns = [
  [
    { name: "meeting", image: "../../assets/meeting.jpg" },
    { name: "concerts", image: "../../assets/concerts.jpg" },
    { name: "Party", image: "../../../public/assets/party.jpg" },
  ],
  [
    { name: "custome events", image: "../../assets/customevents.jpg" },
    { name: "art", image: "../../assets/art.jpg" },
  ],
  [
    { name: "seminar", image: "../../assets/seminar.jpg" },
    { name: "dinners", image: "../../assets/dinners.jpg" },
  ],
];

export default function EventsSection() {
  return (
    <Section header="Our Events Services">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {coloumns.map((col, index) => {
          return (
            <div className="col flex flex-col gap-4" key={index + 1}>
              {col.map(({ name, image }) => {
                return (
                  <>
                    <motion.div
                      initial={{ y: 60, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{once: true}}
                      transition={{duration: 1, delay: 0.5}}
                      className="rounded-md shadow-sm relative after:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:bg-black after:opacity-50 after:duration-500 hover:after:opacity-0"
                      key={name}
                    >
                      <img src={image} className="rounded-md" />
                      <p className="absolute rounded-md py-2 bg-transparent  bottom-0 left-0 w-full z-20 text-white text-lg text-center backdrop-blur-sm">{name}</p>
                    </motion.div>
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
