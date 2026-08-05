import { motion, useAnimate } from "motion/react";
import { useState, useRef, useEffect } from "react";

const DancingCard = ({ size, suit, leaving }) => {
  const [scope, animate] = useAnimate();
  const [dragging, setDragging] = useState(false);
  const handledDown = useRef(false);
  const handledUp = useRef(false);
  const timeoutId = useRef("");

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

  // If grabbed, erase rewiggle timer
  useEffect(() => {
    if (dragging === true) {
      clearTimeout(timeoutId.current);
    }
  }, [dragging]);

  // If parent component is deleted
  useEffect(() => {
    if (leaving) {
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
      className="border-6 border-black/95 rounded-xl bg-contain bg-no-repeat cursor-pointer shadow-2xl"
      style={{
        width: `${size * 335}px`,
        height: `${size * 492}px`,
      }}
      initial={{ x: suit === "s" || suit === "h" ? -2000 : 2000 }}
      // Drag Controls
      drag
      dragConstraints={{ top: -1, left: -1, right: 1, bottom: 1 }}
      dragElastic={1}
      draggable={false}
      // Grab Captures
      onPointerDownCapture={(e) => {
        handledUp.current = false;
        handledDown.current = true;
        setDragging(true);
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
      onDragStart={(e) => {
        handledUp.current = false;
        if (handledDown.current === true) return;
        setDragging(true);
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
      onPointerUpCapture={(e) => {
        handledDown.current = false;
        handledUp.current = true;
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
        setDragging(false);
        timeoutId.current = setTimeout(() => {
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
        }, 750);
      }}
      onDragEnd={(e) => {
        handledDown.current = false;
        if (handledUp.current === true) return;
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
        setDragging(false);
        timeoutId.current = setTimeout(() => {
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
        }, 750);
      }}
      onPointerCancelCapture={(e) => {
        handledDown.current = false;
        if (handledUp.current === true) return;
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
        setDragging(false);
        timeoutId.current = setTimeout(() => {
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
        }, 750);
      }}
    />
  );
};

export default DancingCard;
