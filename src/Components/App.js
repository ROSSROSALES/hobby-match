
import Cards from "./Cards.js";
import Chat from "./Chat.js";
import Header from "./Header";
import History from "./History";
import LoadingScreen from "./Loading";
import { SignIn } from "./SignIn";

import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "../firebase";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1600)
  }, [])

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
