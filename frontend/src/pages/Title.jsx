import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import DancingCard from "../components/DancingCard.jsx";
import useTimer from "../hooks/useTimer.jsx";

const Title = () => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [transitioning, setTransitioning] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hasChecked = useRef(false);
  const { startTimer } = useTimer();

  useEffect(() => {
    if (!hasChecked.current) {
      hasChecked.current = true;
      if (localStorage.getItem("token")) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    changeScreen("/login");
    startTimer(() => {
      setIsLoggedIn(false);
    }, 1);
  };

  const changeScreen = (destination) => {
    setTransitioning(true);
    startTimer(() => {
      setExiting(true);
      animate(
        scope.current,
        {
          background: "radial-gradient(circle at top, #35654d 0%, #1e1e1e 80%)",
        },
        {
          duration: 2,
          easing: "ease-in-out",
        },
      );
      startTimer(() => {
        navigate("/" + destination);
      }, 3000);
    }, 1);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <motion.div
        ref={scope}
        animate={{
          background: [
            "radial-gradient(circle at top, #35654d 0%, #1e1e1e 80%)",
            "radial-gradient(circle at top, #2f4f4f 0%, #1e1e1e 80%)",
            "radial-gradient(circle at top, #663d3d 0%, #1e1e1e 80%)",
          ],
          transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 3,
            ease: "easeInOut",
          },
        }}
        className="absolute inset-0 overflow-hidden"
      >
        <AnimatePresence>
          {!exiting && (
            <div className="w-full min-h-screen text-white flex flex-col items-center justify-center">
              {/* Title and Moving cards */}
              <div className="flex flex-row items-center gap-40 mb-20">
                <DancingCard size={0.4} suit={"s"} leaving={transitioning} />
                <motion.div
                  initial={{ y: "-100vh" }}
                  animate={{
                    y: "0px",
                    transition: {
                      duration: 1,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    scale: 1.3,
                    opacity: 0,
                    transition: {
                      duration: 2.5,
                      ease: "easeInOut",
                    },
                  }}
                  className="font-[Consolas] tracking-wide text-8xl font-semibold text-center p-5 text-sky-700 rounded-4xl border-7 border-black bg-yellow-50/70 cursor-default"
                >
                  Virtual Casino
                </motion.div>
                <DancingCard size={0.4} suit={"c"} leaving={transitioning} />
              </div>

              <div className="flex flex-row items-center gap-200 mb-10">
                <DancingCard size={0.4} suit={"h"} leaving={transitioning} />
                <DancingCard size={0.4} suit={"d"} leaving={transitioning} />
              </div>

              {!isLoggedIn && (
                <div className="flex gap-50">
                  {/* LOGIN chip */}
                  <motion.div
                    className="w-48 h-48 bg-[url('src/assets/black-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl select-none"
                    onClick={() => changeScreen("login")}
                    initial={{ y: "100vh" }}
                    animate={{
                      y: "0px",
                      transition: {
                        duration: 2.5,
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
                      y: "50vh",
                      opacity: 0,
                      transition: {
                        duration: 2,
                      },
                    }}
                  >
                    LOGIN
                  </motion.div>

                  {/* SIGNUP chip */}
                  <motion.div
                    className="w-48 h-48 bg-[url('src/assets/black-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl select-none"
                    onClick={() => changeScreen("signup")}
                    initial={{ y: "100vh" }}
                    animate={{
                      y: "0px",
                      transition: {
                        duration: 2.5,
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
                      y: "50vh",
                      opacity: 0,
                      transition: {
                        duration: 2,
                      },
                    }}
                  >
                    SIGNUP
                  </motion.div>
                </div>
              )}

              {isLoggedIn && (
                <div className="flex gap-50">
                  {/* LOGOUT chip */}
                  <motion.div
                    className="w-48 h-48 bg-[url('src/assets/red-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl select-none"
                    onClick={() => handleLogout()}
                    initial={{ y: "100vh" }}
                    animate={{
                      y: "0px",
                      transition: {
                        duration: 2.5,
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
                      y: "50vh",
                      opacity: 0,
                      transition: {
                        duration: 2,
                      },
                    }}
                  >
                    LOGOUT
                  </motion.div>

                  {/* PLAY chip */}
                  <motion.div
                    className="w-48 h-48 bg-[url('src/assets/green-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-2xl select-none"
                    onClick={() => changeScreen("home")}
                    initial={{ y: "100vh" }}
                    animate={{
                      y: "0px",
                      transition: {
                        duration: 2.5,
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
                      y: "50vh",
                      opacity: 0,
                      transition: {
                        duration: 2,
                      },
                    }}
                  >
                    PLAY
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Title;
