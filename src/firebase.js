import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
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

