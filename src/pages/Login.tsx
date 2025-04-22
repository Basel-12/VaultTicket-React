import { motion } from "framer-motion";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {login} = useAuth()

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(!username || !password)
      console.log('please fill all fields')

    try{
      await login(username,password)
    }catch(err : any){
      console.log(err.message)
    }
  }

  return (
    <>
      <NavBar />
      <section className="h-[calc(100vh-10px)]">
        <div className="container flex justify-center items-center h-full">
          <motion.form
            initial={{ y: 60, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-md justify-center shadow-xl shadow-white p-5 gap-2 w-[400px] h-[300px]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-3">
              <label htmlFor="" className="text-white text-lg">
                UserName
              </label>
              <input
                type="text"
                value={username}
                className="py-1 rounded-sm outline-none text-black"
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="text-white text-lg">Password</label>
              <input
                type="password"
                value={password}
                className="py-1 rounded-sm outline-none text-black"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="text-white bg-red-400 rounded-md py-1 px-4 mt-2">
              Login
            </button>
          </motion.form>
        </div>
      </section>
      <Footer />
    </>
  );
}
