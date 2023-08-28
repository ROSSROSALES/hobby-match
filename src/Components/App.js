
import TinderCards from "./TinderCards.js";
import Chat from "./Chat.js";
import Image from "./Image.js";
import Header from "./Header";
import LoadingScreen from "./Loading";
import History from "./History";
import { SignIn } from "./SignIn";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
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

  const [user] = useAuthState(auth);
  
  return (
    <>  
    {loading === false ? (
        <Router>

          <Header auth = { auth } /> 
            <Routes>
              
              <Route path="/chat" element={user ? <Chat /> : <SignIn />}>
              </Route>

              <Route path="/" element={user ? <TinderCards /> : <SignIn />}>
              </Route>

              <Route path="/image" element={<Image />}>
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
