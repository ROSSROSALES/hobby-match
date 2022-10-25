
import TinderCards from "./TinderCards.js";
import Chat from "./Chat.js";
import Image from "./Image.js";
import Header from "./Header";
import LoadingScreen from "./Loading";
import History from "./History";
import { SignIn } from "./SignIn";

import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./App.css";

import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

//const useStyles = makeStyles({
//  header: {
//    display: "flex",
//    justifyContent: "space-between"
//  },
//  header_icon: {
//    padding: "200px",
//    fill: "orange",
//    fontSize: "large"
//  },
//  card: {
//    margin: "0 auto",
//    padding: "10px",
//
//    width: "200px",
//    height: "300px",
//
//    borderRadius: "10px",
//    backgroundColor: "#ad5389"
//  },
//  mainBackground: {
//    height: "97.3vh",
//    
//    background: "linear-gradient(90deg, rgba(48, 16, 255, 1) 0%,rgba(100, 115, 255, 1) 100%)", // OLD "linear-gradient(40deg, #6DD5FA 10%, #FFFFFF 90%)",
//
//    display: "flex",
//    justifyContent: "center",
//    alignContent: "center"
//  }
//});

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000)
  }, [])

  const [user] = useAuthState(auth);
  
  //console.log(user.email)

  useEffect(() => {
    async function sendMessage(e) {
      e.preventDefault();
      const { photoURL } = auth.currentUser;
    }
  }, [user])
  
  //const classes = useStyles();

  return (
    <>  
    {loading === false ? (
        <Router>

          <Header auth = { auth } /*photoURL= { photoURL }*//> 
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
