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
      <h1>Login Page</h1>
      <form noValidate onSubmit={handleLogin}>
        <button type="submit" className="border-2 border-black-200 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
