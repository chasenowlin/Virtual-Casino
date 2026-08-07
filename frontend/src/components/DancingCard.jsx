import { motion, useAnimate } from "motion/react";
import { useState, useRef, useEffect } from "react";

const DancingCard = ({ size, suit, leaving }) => {
  const [scope, animate] = useAnimate();
  const [noTouch, setNoTouch] = useState(false);

  useEffect(() => {
    animate(scope.current, { x: 0 }, { duration: 2 });

    // Wiggle and bob animation
    setTimeout(
      () =>
        animate(
          scope.current,
          {
            rotate: [0, 3, -3, 0],
          },
          {
            duration: 2,
            repeat: Infinity,
            easing: "ease-in-out",
          },
        ),
      2000,
    );
  }, []);

  // If parent component is deleted
  useEffect(() => {
    if (leaving) {
      setNoTouch(true);
      animate(
        scope.current,
        { y: "-200vh", opacity: 0 },
        { duration: 2, easing: "ease-in-out" },
      );
    }
  }, [leaving]);

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
      className={`border-6 border-black/95 rounded-2xl bg-contain bg-no-repeat cursor-pointer shadow-2xl ${noTouch ? "pointer-events-none" : "pointer-events-auto"}`}
      style={{
        width: `${size * 335}px`,
        height: `${size * 492}px`,
      }}
      initial={{ x: suit === "s" || suit === "h" ? -2000 : 2000 }}
      // Drag Controls
      drag
      dragConstraints={{ top: -5, left: -5, right: 5, bottom: 5 }}
      dragElastic={1}
      // Grab Captures
      onDragStart={(e) => {
        scope.current.style.zIndex = 99;
        animate(
          scope.current,
          {
            scale: 2,
          },
          {
            duration: 1,
            easing: "ease-in-out",
          },
        );
      }}
      // Release Captures
      onDragEnd={(e) => {
        setNoTouch(true);
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
        setTimeout(() => {
          animate(
            scope.current,
            {
              rotate: [0, 3, -3, 0],
            },
            {
              duration: 2,
              repeat: Infinity,
              easing: "ease-in-out",
            },
          );
          scope.current.style.zIndex = "auto";
          setNoTouch(false);
        }, 750);
      }}
    />
  );
};

export default DancingCard;
