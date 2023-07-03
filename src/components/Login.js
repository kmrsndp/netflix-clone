import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { BsPhoneFill } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email === "" || !email.includes("@")) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("please fill all fields");
    } else if (password === "" || !password.length >= 6) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("password invalid");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMobileLogin = () => {
    // Handle mobile login
    // Implement your login logic here
  };

  return (
    <div className="bg-slate-500 max-h-full h-full login-page justify-center items-center ">
      <div className="mt-3 flex items-center flex-col justify-center mr-10  rounded-xl bg-gray-300"
      >
        <h2 className="font-bold mt-3">Login</h2>
        <form className="flex flex-col space-y-3 mt-5 mb-5 mr-8 ml-8" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            // value={user.email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            // value={user.password}
            onChange={handlePasswordChange}
            required
          />
          <button className="button-success" type="submit">
          {/* bg-green-800 shadow-lg font-semibold */}
            Log in
          </button>
          <button
            className="button-signup"
            // bg-gray-600 shadow-lg font-semibold
            type="submit"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
      {/* <div className="divider"></div> */}
      <div className="mt-3 flex items-center flex-col justify-center ml-10">
        <div className="flex flex-col  space-y-4">
          <button
            className="bg-gray-100 shadow-lg items-center flex flex-row space-x-2 hover:bg-gray-300 rounded-full"
            onClick={handleGoogleLogin}
          >
            <FcGoogle></FcGoogle>
            <span>Login with Google</span>
          </button>
          <button className="bg-gray-500 shadow-lg items-center flex flex-row space-x-2 hover:bg-gray-600 rounded-full" 
          onClick={handleMobileLogin}>
            <BsPhoneFill></BsPhoneFill>
            <span>Login with Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
