import { motion } from "motion/react";

const Login = () => {
  async function handleLogin(event) {
    event.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data.message);
    } catch (e) {
      console.log("Error");
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,_#35654d_0%,_#1e1e1e_80%)]">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: "-30vh" }}
          exit={{
            scale: 1.3,
            opacity: 0,
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="font-[Consolas] tracking-wide text-2xl font-semibold text-center p-5 text-sky-700 rounded-4xl border-7 border-black bg-yellow-50/70"
        >
          Login
        </motion.div>
        <form noValidate onSubmit={handleLogin}>
          <button
            type="submit"
            className="border-2 border-black-200 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
