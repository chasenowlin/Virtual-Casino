import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full py-6 bg-gray-800 text-gray-200 mx-auto flex items-center justify-between">
      <h1>Navbar Component</h1>
      <div className="flex items-center gap-8 mx-auto">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
