import "./App.css";
import TableEntry from "./components/TableEntry";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from "./firebaseconfig";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <TableEntry /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/app" element={<Login></Login>} />
      </Routes>
    </Router>
  );
}

export default App;
