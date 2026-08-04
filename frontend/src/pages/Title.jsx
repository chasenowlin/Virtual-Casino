import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Title = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-green-900 text-white flex flex-col items-center justify-center">
      <h1 className="font-serif tracking-wide text-8xl font-semibold mb-30 text-center">
        Virtual Casino
      </h1>

      <div className="flex gap-50">
        {/* LOGIN chip */}
        <motion.div
          className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.1, rotate: 360 }}
        >
          LOGIN
        </motion.div>

        {/* SIGNUP chip */}
        <motion.div
          className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
          onClick={() => navigate("/signup")}
          whileHover={{ scale: 1.1, rotate: 360 }}
        >
          SIGNUP
        </motion.div>
      </div>
    </div>
  );
};

export default Title;
