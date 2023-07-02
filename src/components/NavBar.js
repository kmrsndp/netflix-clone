import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

// import { NavLink } from "react-router-dom";

const Navbar1 = () => {
  const navigate = useNavigate();
  // const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo ml-8">
          <h2>
            <span>L</span>akshmi
            <span>N</span>arayan
            <span>E</span>nterprise
          </h2>
        </div>

        <div className="menu-link">
          <ul>
            <li>Home</li>
            <li>about</li>
            <li>services</li>
            <li>contact</li>
          </ul>
        </div>

        {user && (
          <div className="logout">
            <button className="mr-8 button-17" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar1;
