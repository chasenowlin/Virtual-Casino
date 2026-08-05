import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const waiting = useRef(false);
  const [exiting, setExiting] = useState(false);
  const [message, setMessage] = useState("");

  // Message dropdown
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message]);

  // Screen transition
  const changeScreen = (destination) => {
    // If login successful, dont allow more transitions
    if (waiting.current === true) {
      return;
    }
    setMessage("");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        navigate("/" + destination);
      }, 2000);
    }, 1);
  };

  // Submit attempt handler
  async function handleLogin(event) {
    event.preventDefault();
    if (message) {
      return;
    }
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await res.json();
      setMessage(data.message);
      console.log(data.message);

      // If login successful
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        waiting.current = true;
        // wait for message to display
        setTimeout(() => {
          waiting.current = false;
          changeScreen("/");
        }, 3000);
      }
    } catch (e) {
      console.log("Error");
      setMessage("An Error has Occurred");
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <AnimatePresence>
        {/* Dropdown message */}
        {message && (
          <motion.div
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-20vh", opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="absolute w-full top-0 flex items-center justify-center"
          >
            <h1
              className={`w-full p-2 text-center rounded-lg tracking-wide font-semibold text-xl ${
                message === "Login Successful"
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-200"
              }`}
            >
              {message}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!exiting && (
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            {/* Login  */}
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{
                y: "-100px",
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
              exit={{
                y: "-100vh",
                opacity: 0,
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
              }}
              className="font-[Consolas] tracking-wide text-4xl font-bold text-center p-5 px-10 text-sky-700 rounded-4xl border-7 border-black bg-yellow-50/70"
            >
              Login
            </motion.div>
            <div className="flex flex-row items-center justify-center gap-50">
              {/* BACK chip */}
              <motion.div
                className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl"
                onClick={() => changeScreen("")}
                initial={{ y: "200vh" }}
                animate={{
                  y: "0px",
                  transition: {
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: {
                    duration: 0.2,
                  },
                }}
                exit={{
                  y: "100vh",
                  opacity: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                BACK
              </motion.div>

              <motion.div
                initial={{ x: "-200vw" }}
                animate={{
                  x: "0px",
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }}
                exit={{
                  x: "200vw",
                  opacity: 0,
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }}
                className="w-100 h-120 p-10 bg-white border-6 border-black/95 rounded-xl shadow-2xl"
              >
                <form
                  noValidate
                  autoComplete="off"
                  className="flex flex-col gap-4"
                >
                  <div className="pb-5">
                    <label htmlFor="email" className="block text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1FB5A8]"
                    />
                  </div>

                  <div className="pb-5">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1FB5A8]"
                    />
                  </div>
                </form>
              </motion.div>

              {/* SUBMIT chip */}
              <motion.div
                className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl"
                onClick={(e) => handleLogin(e)}
                initial={{ y: "200vh" }}
                animate={{
                  y: "0px",
                  transition: {
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: {
                    duration: 0.2,
                  },
                }}
                exit={{
                  y: "100vh",
                  opacity: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                SUBMIT
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
