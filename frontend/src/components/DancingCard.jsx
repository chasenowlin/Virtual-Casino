import { motion, useAnimate } from "motion/react";
import { useState, useRef } from "react";

const DancingCard = ({ size, suit }) => {
  const [scope, animate] = useAnimate();
  const dragging = useRef(false);
  const waiting = useRef(false);

  return (
    <motion.img
      src={
        suit === "s"
          ? "src/assets/spade-ace.png"
          : suit === "c"
            ? "src/assets/club-ace.png"
            : suit === "h"
              ? "src/assets/heart-ace.png"
              : "src/assets/diamond-ace.png"
      }
      ref={scope}
      className="border-6 border-black/95 rounded-xl bg-contain bg-no-repeat cursor-pointer"
      style={{
        width: `${size * 335}px`,
        height: `${size * 492}px`,
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
      onDragStart={(e) => (dragging.current = true)}
      onDragEnd={(e) => {
        animate(
          scope.current,
          {
            rotate: [0, 360],
            scale: 1,
          },
          {
            duration: 0.75,
            easing: "ease-in-out",
          },
        );
        dragging.current = false;

        if (waiting.current === false) {
          waiting.current = true;
          setTimeout(() => {
            if (!dragging.current) {
              animate(
                scope.current,
                {
                  rotate: [0, 3, -3, 0],
                  y: [0, -5, 0],
                },
                {
                  duration: 2,
                  repeat: Infinity,
                  easing: "ease-in-out",
                },
              );
            }
            waiting.current = false;
          }, 2500);
        }
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
