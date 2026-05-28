import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  AuthContext,
} from "../context/AuthContext";

function Register() {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/auth/register",
            formData
          );

        login(
          response.data.user,
          response.data.token
        );

        navigate("/store");

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Registration failed"
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 overflow-hidden relative">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        {/* TITLE */}
        <div className="text-center mb-10">

          <h2 className="text-5xl font-extrabold text-white mb-3">

            Create Account

          </h2>

          <p className="text-gray-300">

            Join ShopBot AI today ✨

          </p>

        </div>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-300 p-4 rounded-2xl mb-5 outline-none focus:border-blue-500"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-300 p-4 rounded-2xl mb-5 outline-none focus:border-purple-500"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-300 p-4 rounded-2xl mb-6 outline-none focus:border-pink-500"
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl text-lg font-bold hover:scale-[1.02] transition duration-300 shadow-xl"
        >

          Create Account

        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-300 mt-7">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-400 font-semibold ml-2 hover:text-white transition"
          >

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;