import { motion, useAnimate } from "motion/react";

const DancingCard = ({ size }) => {
  const [scope, animate] = useAnimate();

  return (
    <motion.img
      src="src/assets/card-back.png"
      ref={scope}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      // Wiggle and bob animation
      animate={{
        rotate: [0, 3, -3, 0],
        y: [0, -5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      // Drag Controls
      drag
      dragConstraints={{ top: -1, left: -1, right: 1, bottom: 1 }}
      dragElastic={1}
      draggable={false}
      whileDrag={{
        scale: 2,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      }}
      onDragEnd={(e) => {
        animate(
          scope.current,
          {
            rotate: [0, 360],
            scale: 1,
          },
          {
            duration: 0.6,
            easing: "ease-in-out",
          },
        );
      }}
      // Exit animation
      exit={{
        y: "-200vh",
        opacity: 0,
        transition: {
          duration: 2,
          ease: "easeInOut",
        },
      }}
    />
  );
};

export default DancingCard;
