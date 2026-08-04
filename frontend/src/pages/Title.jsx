import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import DancingCard from "../components/DancingCard.jsx";

const Title = () => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [pageChanging, setPageChanging] = useState(false);

  const changeScreen = (destination) => {
    setPageChanging(true);
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
    setTimeout(() => {
      navigate("/" + destination);
    }, 3000);
  };

  return (
    <motion.div
      ref={scope}
      animate={{
        background: [
          "radial-gradient(circle at top, #2f4f4f 0%, #1e1e1e 80%)",
          "radial-gradient(circle at top, #35654d 0%, #1e1e1e 80%)",
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
        {!pageChanging && (
          <div className="w-full min-h-screen text-white flex flex-col items-center justify-center">
            {/* Title and Moving cards */}
            <div className="flex flex-row items-center gap-40 mb-20">
              <DancingCard size={175} />
              <motion.div
                exit={{
                  scale: 1.3,
                  opacity: 0,
                }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="font-[Consolas] tracking-wide text-8xl font-semibold text-center p-5 text-sky-700 rounded-4xl border-7 border-black bg-yellow-100/70"
              >
                Virtual Casino
              </motion.div>
              <DancingCard size={175} />
            </div>

            <div className="flex flex-row items-center gap-200 mb-30">
              <DancingCard size={175} />
              <DancingCard size={175} />
            </div>

            <div className="flex gap-50">
              {/* LOGIN chip */}
              <motion.div
                className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
                onClick={() => changeScreen("signup")}
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
                className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
                onClick={() => changeScreen("signup")}
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
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Title;
