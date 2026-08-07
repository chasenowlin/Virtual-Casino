import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [transitioning, setTransitioning] = useState(false);
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
    // If signup successful, dont allow more transitions
    setTimeout(() => {
      setMessage("");
      setExiting(true);
      setTimeout(() => {
        setTransitioning(false);
        setEmail("");
        setUsername("");
        setPassword("");
        navigate("/" + destination);
      }, 2000);
    }, 1);
  };

  const handleBack = (event) => {
    if (!transitioning) {
      setTransitioning(true);
      changeScreen("");
    }
  };

  // Submit attempt handler
  const handleSignup = async (event) => {
    event.preventDefault();
    if (message || transitioning) {
      return;
    }
    setTransitioning(true);

    if (!username || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.includes(" ")) {
      setMessage(
        "Password must be more than 8 characters and not have spaces.",
      );
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      if (res.status !== 201) {
        setTransitioning(false);
      }

      const data = await res.json();
      setMessage(data.message);
      console.log(data.message);

      // If signup successful
      if (res.status === 201) {
        // wait for message to display
        setTimeout(() => {
          changeScreen("/login");
        }, 3000);
      }
    } catch (e) {
      console.log("Error");
      setMessage("An Error has Occurred");
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <AnimatePresence>
        {/* Dropdown message */}
        {message && (
          <motion.div
            initial={{ y: "-50vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full top-0 flex items-center justify-center"
          >
            <h1
              className={`w-full p-2 text-center rounded-lg tracking-wide font-semibold text-xl ${
                message === "Account Created Successfully"
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
            {/* Signup  */}
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
              Signup
            </motion.div>
            <div className="flex flex-row items-center justify-center gap-50">
              {/* BACK chip */}
              <motion.div
                className={`w-48 h-48 bg-[url('src/assets/red-chip.png')] bg-contain bg-no-repeat flex items-center justify-center text-black font-bold text-2xl select-none ${transitioning ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                onClick={() => handleBack()}
                initial={{ y: "200vh" }}
                animate={{
                  y: "0px",
                  transition: {
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: transitioning ? 1.0 : 1.2,
                  rotate: transitioning ? 35 : 360,
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
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
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
                className="w-84 h-123 p-10 bg-[url('src/assets/omni-suit.png')] border-6 border-black/95 rounded-xl bg-contain bg-no-repeat"
              >
                <form
                  noValidate
                  autoComplete="off"
                  className="flex flex-col gap-4  my-15"
                >
                  <div className="pb-3">
                    <label htmlFor="email" className="block text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 bg-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="pb-3">
                    <label
                      htmlFor="username"
                      className="block text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border border-gray-300 bg-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="pb-3">
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
                      className="w-full border border-gray-300 bg-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </form>
              </motion.div>

              {/* SUBMIT chip */}
              <motion.div
                className={`w-48 h-48 bg-[url('src/assets/green-chip.png')] bg-contain bg-no-repeat flex items-center justify-center text-black font-bold text-2xl select-none ${message || transitioning ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                onClick={(e) => handleSignup(e)}
                initial={{ y: "200vh" }}
                animate={{
                  y: "0px",
                  transition: {
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: message || transitioning ? 1.0 : 1.2,
                  rotate: message || transitioning ? 35 : 360,
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

export default Signup;
