import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-green-900 text-white flex flex-col items-center justify-center">
      <h1 className="font-serif text-8xl font-semibold mb-30 text-center">
        Virtual Casino
      </h1>

      <div className="flex gap-20">
        {/* LOGIN chip */}
        <div
          className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </div>

        {/* SIGNUP chip */}
        <div
          className="w-48 h-48 bg-[url('src/assets/poker-chip.png')] bg-contain bg-no-repeat cursor-pointer flex items-center justify-center text-black font-bold text-xl"
          onClick={() => navigate("/signup")}
        >
          SIGNUP
        </div>
      </div>
    </div>
  );
};

export default Title;
