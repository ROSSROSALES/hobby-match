
import Cards from "./Cards.js";
import Chat from "./Chat.js";
import Header from "./Header";
import LoadingScreen from "./Loading";
import History from "./History";
import { SignIn } from "./SignIn";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./App.css";

import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  // add lock to check for api response before showing data
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1600)
  }, [])

  const user = auth.currentUser;
  
  console.log('This is the user', user)

  
  return (
    <>  
    {loading === false ? (
        <Router>
          <Header/>
            <Routes>
              <Route exact path="/sign-in" element={user ? <Navigate to="/" /> : <SignIn />}>
              </Route>

              <Route exact path="/" element={user ? <Cards /> : <Navigate to="/sign-in"/> }>
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
