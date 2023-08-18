import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { initializeApp } from 'firebase/app';
import { getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyAOnYfYcGgrz5CBwlSj3NTW-Rzo6hQ85A8",
    authDomain: "anime-match-a5f94.firebaseapp.com",
    projectId: "anime-match-a5f94",
    storageBucket: "anime-match-a5f94.appspot.com",
    messagingSenderId: "561233950151",
    appId: "1:561233950151:web:84b1c7e0e5684b410a95e2",
    measurementId: "G-WMRL0G5JYF"
};

const app = initializeApp(firebaseConfig); // initializes connection to firebase
const auth = getAuth(app); //get which user is authenticated
const firestore = getFirestore(app); // returns firestore instance, Database Instance
const querySnapshot = collection(firestore, "user") // grabs snapshot of collection, after updating from 'firebase/firestore/lite' to 'firebase/firestore'
//console.log('This is the read of the collection of data', querySnapshot)

const colRef = collection(firestore, "users")


const provider = new GoogleAuthProvider(); // used to help log in authentication


function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result => {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            console.log(name, email, profilePic)

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);
        }))
        .catch((error) => {
            console.log(error)
        });
}

function SignOut() {
      auth.signOut()
};

export { signInWithGoogle, auth, firestore, SignOut, querySnapshot, /*getuserdata*/ };
