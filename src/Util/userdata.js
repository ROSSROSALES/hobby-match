import { useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = collection(firestore, "user")

// store an array/map of data in a state, and export it to history



function getcollectiondata() {
  
}

export { getcollectiondata };
