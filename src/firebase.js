import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, getFirestore } from 'firebase/firestore';

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


console.log(process.env.REACT_APP_APIKEY);
const provider = new GoogleAuthProvider();

function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result => {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);
        }))
        .catch((error) => {
            console.log(error)
            console.log("this is sa test")
        });
}

function SignOut() {
      auth.signOut()
};

export { SignOut, auth, firestore, querySnapshot, signInWithGoogle };

