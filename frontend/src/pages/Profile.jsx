import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import useTimer from "../hooks/useTimer";

const Profile = () => {
  const navigate = useNavigate();
  const hasChecked = useRef(false);
  const [exiting, setExiting] = useState(false);
  const [account, setAccount] = useState({});
  const { startTimer } = useTimer();

  useEffect(() => {
    if (!hasChecked.current) {
      hasChecked.current = true;
      if (!localStorage.getItem("token")) {
        navigate("/");
      } else {
        fetchAccountSecure();
      }
    }
  }, []);

  const fetchAccountSecure = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "profile", {
        method: "GET",
        headers: { "x-auth": localStorage.getItem("token") },
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data.message);
        setAccount(data.account);
      } else {
        if (res.status === 401) {
          localStorage.removeItem("token");
        }
        navigate("/");
      }
    } catch (e) {
      console.log("Error");
      navigate("/");
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <AnimatePresence>
        {!exiting && account && (
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            {/* Name */}
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{
                y: "-100px",
                transition: {
                  duration: 1,
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
              className="font-[Consolas] tracking-wide text-4xl font-bold text-center p-5 px-10 text-sky-700 rounded-4xl border-7 border-black bg-yellow-50/70"
            >
              {`${account.username}'s Profile`}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
