const Signup = () => {
  async function handleSignup(event) {
    event.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "auth/signup", {
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
      <h1>Signup Page</h1>
      <form noValidate onSubmit={handleSignup}>
        <button type="submit" className="border-2 border-black-200 rounded-lg">
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
