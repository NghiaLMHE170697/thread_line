import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setApiError("");
    let valid = true;
    if (!email) {
      setErrEmail("Please enter your email");
      valid = false;
    }
    if (!password) {
      setErrPassword("Please enter your password");
      valid = false;
    }
    if (!valid) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Login failed");
        return;
      }
      // Store user info in redux and localStorage
      const user = data.data && data.data.user ? data.data.user : { email };
      dispatch({ type: "orebi/addUserInfo", payload: user });
      localStorage.setItem("threadline_user", JSON.stringify(user));
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setApiError("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <Link to="/">
          <img src="img/logo.jpg" alt="ThreadLine Logo" className="w-20 mb-6" />
        </Link>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Sign in to ThreadLine</h1>
        <p className="text-gray-500 mb-6 text-center">Welcome back! Please enter your details to continue.</p>
        {apiError && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">{apiError}</div>
        )}
        {successMsg && (
          <div className="w-full mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">{successMsg}</div>
        )}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSignIn}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errEmail ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="you@email.com"
            />
            {errEmail && <p className="text-xs text-red-500 mt-1">{errEmail}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errPassword ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Your password"
            />
            {errPassword && <p className="text-xs text-red-500 mt-1">{errPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
