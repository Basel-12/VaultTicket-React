import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
export default function NavBar({ relative }: { relative?: boolean }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0.1 }}
      transition={{ duration: 0.6 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={`${
        relative ? "relative" : "absolute"
      } top-0 left-0 w-full z-40`}
    >
      <div className="container flex items-center  justify-center md:justify-between p-3">
        <div className="logo text-3xl font-mono text-white">Bookings</div>
        <ul className=" hidden pages md:flex  backdrop-blur-lg  rounded-full  py-3 px-5 text-white w-1/3 justify-between items-center shadow-sm shadow-white">
          <NavLink to={"/"} className={"rounded-md p-1"}>
            Home
          </NavLink>
          <NavLink to={"/mybookings"} className={"rounded-md p-1"}>
            Bookings
          </NavLink>
          <NavLink to={"/events"} className={"rounded-md p-1"}>
            Events
          </NavLink>
          {user?.role === "Admin" && (
            <NavLink to={"/admin"} className={"rounded-md p-1"}>
              Dashboard
            </NavLink>
          )}
        </ul>
        <div className="auth hidden md:flex space-x-3 items-center">
          {isAuthenticated && (
            <button
              className="rounded-md py-2 px-6 bg-red-700 text-white duration-150"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {!isAuthenticated && (
            <>
              <Link
                to={"/login"}
                className="rounded-md py-2 px-6 bg-red-700 text-white duration-150"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="rounded-md py-2 px-6 bg-black duration-150 text-white hover:bg-red-700 hover:text-white"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
