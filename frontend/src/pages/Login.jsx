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
    <>
      <h1>Login Page</h1>
      <form noValidate onSubmit={handleLogin}>
        <button type="submit" className="border-2 border-black-200 rounded-lg">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
