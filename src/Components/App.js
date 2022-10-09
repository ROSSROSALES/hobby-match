
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

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
    apiKey: "AIzaSyAOnYfYcGgrz5CBwlSj3NTW-Rzo6hQ85A8",
    authDomain: "anime-match-a5f94.firebaseapp.com",
    projectId: "anime-match-a5f94",
    storageBucket: "anime-match-a5f94.appspot.com",
    messagingSenderId: "561233950151",
    appId: "1:561233950151:web:84b1c7e0e5684b410a95e2",
    measurementId: "G-WMRL0G5JYF"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  header_icon: {
    padding: "20px",
    fill: "orange",
    fontSize: "large"
  },
  card: {
    margin: "0 auto",
    padding: "10px",

    width: "200px",
    height: "300px",

    borderRadius: "10px",
    backgroundColor: "#ad5389"
  },
  mainBackground: {
    height: "97.3vh",
    background: "linear-gradient(40deg, #6DD5FA 10%, #FFFFFF 90%)",

    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  }
});

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000)
  }, [])

  const [user] = useAuthState(auth);
  console.log(user)

  useEffect(() => {
    async function sendMessage(e) {
      e.preventDefault();
      const { photoURL } = auth.currentUser;
    }
  }, [user])
  
  const classes = useStyles();

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

              <Route path="/history" element={<History />}>
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
