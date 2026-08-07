import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimate } from "motion/react";

const Home = () => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const hasChecked = useRef(false);
  const [transitioning, setTransitioning] = useState(false);
  const [exiting, setExiting] = useState(false);
  const currentDegree = useRef(0);

  useEffect(() => {
    if (!hasChecked.current) {
      hasChecked.current = true;
      if (!localStorage.getItem("token") || !localStorage.getItem("account")) {
        navigate("/");
        return;
      }
    }
  }, []);

  const handleSpin = (degrees) => {
    if (!transitioning) {
      animate(
        scope.current,
        { rotate: currentDegree.current + degrees },
        { duration: 1, easing: "ease-in-out" },
      ).then((currentDegree.current += degrees));
    }
  };

  const handleSelect = () => {
    if (!transitioning) {
      setTransitioning(true);
      var destination = "";
      if (currentDegree.current % 360 === 0) {
        destination = "games";
      } else if (
        currentDegree.current % 360 === 270 ||
        currentDegree.current % 360 === -90
      ) {
        destination = "friends";
      } else if (
        currentDegree.current % 360 === 90 ||
        currentDegree.current % 360 === -270
      ) {
        destination = "profile";
      }
      console.log(currentDegree.current, currentDegree.current % 360);
      changeScreen(destination);
    }
  };

  // Screen transition
  const changeScreen = (destination) => {
    // watch animation before exiting
    setTimeout(() => {
      // watching exiting
      setExiting(true);
      setTimeout(() => {
        setTransitioning(false);
        navigate("/" + destination);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <AnimatePresence>
        {!exiting && (
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            {/* SELECT Chip */}
            <motion.div
              className={`w-48 h-48 bg-[url('src/assets/green-chip.png')] bg-contain bg-no-repeat flex items-center justify-center text-black font-bold text-2xl select-none ${transitioning ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
              onClick={() => handleSelect()}
              initial={{ y: "-200vh" }}
              animate={{
                y: "-50px",
                transition: {
                  duration: 3,
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
              whileHover={{
                scale: transitioning ? 1.0 : 1.2,
                rotate: transitioning ? 35 : 360,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              SELECT
            </motion.div>

            <div className="flex flex-row items-center justify-center gap-50">
              {/* BACK arrow */}
              <motion.div
                className={`w-48 h-48 bg-[url('src/assets/red-chip.png')] bg-contain bg-no-repeat flex items-center justify-center text-black font-bold text-2xl select-none ${transitioning ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                onClick={() => handleSpin(90)}
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

              {/* Roulette Wheel */}
              <motion.div
                ref={scope}
                initial={{ x: "-200vw" }}
                animate={{
                  x: "0px",
                  transition: {
                    duration: 1.5,
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
                className="w-145 h-144 p-10 bg-[url('src/assets/roulette-wheel.png')] bg-contain bg-no-repeat"
              />
              {/* NEXT arrow */}
              <motion.div
                className={`w-48 h-48 bg-[url('src/assets/red-chip.png')] bg-contain bg-no-repeat flex items-center justify-center text-black font-bold text-2xl select-none ${transitioning ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                onClick={() => handleSpin(-90)}
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
                NEXT
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
