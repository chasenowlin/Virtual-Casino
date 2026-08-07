import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Title from "./pages/Title.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import Profile from "./pages/Profile.jsx";
import Friends from "./pages/Friends.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-1 bg-slate-100">
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="*" element={<Title />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
