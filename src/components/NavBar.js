import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import {BiLogOut} from "react-icons/bi"

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
            {/* <span>L</span>axmi
            <span>N</span>arayan
            <span>E</span>nterprises */}
            <span></span>store -
            <span></span> keeper
          </h2>
        </div>

        {user && 
        <div className="menu-link mobile-menu-link">
          <ul>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </ul>
        </div>
      }
        {user && (
          <div className="logout">
            <button className="mr-8 button-17" onClick={handleLogOut}>
              <BiLogOut className="mr-2"></BiLogOut>
              Bye!
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar1;
