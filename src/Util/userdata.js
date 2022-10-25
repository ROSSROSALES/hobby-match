import { useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = collection(firestore, "user")

// store an array/map of data in a state, and export it to history



function getcollectiondata() {
  //const [userdata, setuserData] = useState([])
  //getDocs(querySnapshot)
  //    .then((snapshot) => {
  //    console.log("This is snapshot of collection data \n", snapshot.docs) // returns an array of objects
  //    let documents = [] // create new array to hold the data properties
  //    let animetitles = []
  //    snapshot.docs.forEach((doc) => {
  //        documents.push({ ...doc.data(), id: doc.id }) // create a new object to store into documents array
  //        setuserData({ ...doc.data(), id: doc.id })
  //        if (doc.data().animetitle) {
  //            animetitles.push({ ...doc.data().animetitle, id: doc.id })
  //        }
  //    })
  //    console.log(documents)
  //    console.log(animetitles)
  //})
  //.catch(err => {
  //    console.log(err.message)
  //})
  
}

export { getcollectiondata };
