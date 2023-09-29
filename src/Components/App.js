
import Cards from "./Cards.js";
import Chat from "./Chat.js";
import Header from "./Header";
import LoadingScreen from "./Loading";
import History from "./History";
import { SignIn } from "./SignIn";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  // add lock to check for api response before showing data
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1600)
  }, [])

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Cleanup the observer when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <>  
    {loading === false ? (
        <Router>
          <Header/>
            <Routes>

              <Route exact path="/" element={user ? <Cards /> : <SignIn /> }>
              </Route>

              <Route path="/chat" element={user ? <Chat /> : <SignIn />}>
              </Route>

              <Route path="/history" element={user ? <History /> : <SignIn /> }>
              </Route>

            </Routes>
            
        </Router>
        ) : (
          <LoadingScreen />
    )}
    </>
  );
};

export default App;
