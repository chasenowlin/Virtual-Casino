import { motion } from "motion/react";

const DancingCard = ({ size, constraints }) => {
  return (
    <motion.img
      src="src/assets/card-back.png"
      className="opacity-90"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      drag
      dragConstraints={{
        top: constraints[0],
        left: constraints[1],
        right: constraints[2],
        bottom: constraints[3],
      }}
      dragElastic={0.9}
      draggable={false}
      animate={{
        rotate: [0, 3, -3, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default DancingCard;
