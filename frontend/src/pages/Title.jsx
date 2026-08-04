import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import DancingCard from "../components/DancingCard.jsx";

const Title = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{
        background: [
          "radial-gradient(circle at center, #2f4f4f 0%, #1e1e1e 70%)",
          "radial-gradient(circle at center, #35654d 0%, #1e1e1e 70%)",
          "radial-gradient(circle at center, #663d3d 0%, #1e1e1e 70%)",
        ],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Title and Movable Cards */}
      <div className="w-full min-h-screen text-white flex flex-col items-center justify-center">
        <div className="flex flex-row gap-225">
          <DancingCard size={11} constraints={[-150, -320, 1400, 650]} />
          <DancingCard size={11} constraints={[-150, -1400, 320, 650]} />
        </div>
        <div className="flex flex-row gap-60">
          <DancingCard size={11} constraints={[-325, -160, 1560, 475]} />
          <h1 className="font-serif tracking-wide text-8xl font-semibold text-center mb-10">
            Virtual Casino
          </h1>
          <DancingCard size={11} constraints={[-325, -1560, 160, 475]} />
        </div>

        <div className="flex flex-row gap-225">
          <DancingCard size={11} constraints={[-500, -320, 1400, 300]} />
          <DancingCard size={11} constraints={[-500, -1400, 320, 300]} />
        </div>

        <div className="flex gap-50">
          {/* LOGIN chip */}
          <motion.div
            className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            LOGIN
          </motion.div>

          {/* SIGNUP chip */}
          <motion.div
            className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            SIGNUP
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Title;
