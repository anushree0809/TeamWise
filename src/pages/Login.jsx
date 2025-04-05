import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

// const Login = ({ setUserData }) => {  // Receive setUserData as a prop
//   // const [message, setMessage] = useState("");
//   // const authContext = useAuth();
//   // console.log("Auth Context in Login.jsx:", authContext);

//   // const { loginUser } = useAuth();
//   // const navigate = useNavigate();

  

  const Login = ({ setUserData }) => {
    const [message, setMessage] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      try {
        const user = await loginUser(data.email, data.password);
        if (!user) throw new Error("Login failed. No user data received.");
  
        console.log("Firebase User Logged in:", user);
      // Fetch MongoDB user details using EMAIL instead of UID
      const response = await fetch(`http://localhost:3000/api/users/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTczNjI5MjEyNH0.`
        },
      });

      if (!response.ok) {
        throw new Error(`User not found in MongoDB. Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log("MongoDB User Data:", userData);

      // ✅ Store in localStorage & update App state
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData); // Update state in App.jsx

      alert("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Invalid email or password");
      console.error(error);
    }
  };


  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
