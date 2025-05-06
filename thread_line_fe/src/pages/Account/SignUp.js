import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checked, setChecked] = useState(false);

  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errPasswordConfirm, setErrPasswordConfirm] = useState("");
  const [errChecked, setErrChecked] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  const emailValidation = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError("");
    let valid = true;
    setErrUsername("");
    setErrEmail("");
    setErrPassword("");
    setErrPasswordConfirm("");
    setErrChecked("");

    if (!username) {
      setErrUsername("Please enter your name");
      valid = false;
    }
    if (!email) {
      setErrEmail("Please enter your email");
      valid = false;
    } else if (!emailValidation(email)) {
      setErrEmail("Please enter a valid email");
      valid = false;
    }
    if (!password) {
      setErrPassword("Please enter a password");
      valid = false;
    } else if (password.length < 8) {
      setErrPassword("Password must be at least 8 characters");
      valid = false;
    }
    if (!passwordConfirm) {
      setErrPasswordConfirm("Please confirm your password");
      valid = false;
    } else if (password !== passwordConfirm) {
      setErrPasswordConfirm("Passwords do not match");
      valid = false;
    }
    if (!checked) {
      setErrChecked("You must agree to the ThreadLine Terms and Privacy Policy");
      valid = false;
    }
    if (!valid) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, passwordConfirm })
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Sign up failed");
        return;
      }
      setSuccessMsg("Sign up successful! Please check your email to verify your account.");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setChecked(false);
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
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Create your ThreadLine account</h1>
        {apiError && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">{apiError}</div>
        )}
        {successMsg && (
          <div className="w-full mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">{successMsg}</div>
        )}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errUsername ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Your name"
            />
            {errUsername && <p className="text-xs text-red-500 mt-1">{errUsername}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errPassword ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Create a password"
            />
            {errPassword && <p className="text-xs text-red-500 mt-1">{errPassword}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errPasswordConfirm ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Re-enter your password"
            />
            {errPasswordConfirm && <p className="text-xs text-red-500 mt-1">{errPasswordConfirm}</p>}
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="w-4 h-4 mt-1 cursor-pointer"
            />
            <p className="text-sm text-gray-600">
              I agree to the <span className="text-blue-600">ThreadLine Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>.
            </p>
          </div>
          {errChecked && <p className="text-xs text-red-500 mt-1">{errChecked}</p>}
          <button
            type="submit"
            className={`w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition ${!checked ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!checked}
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
