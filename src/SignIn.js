import React from 'react';
import { auth, signInWithGoogle } from "./firebase";
import "./SignIn.css"


function SignIn() {
     
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign In</button>
        <p></p>
      </>
    )
  
    }

export { SignIn };