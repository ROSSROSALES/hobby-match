import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.envmeasurementId
};

const app = initializeApp(firebaseConfig); // initializes connection to firebase
const auth = getAuth(app); //get which user is authenticated
const firestore = getFirestore(app); // returns firestore instance, Database Instance
const querySnapshot = collection(firestore, "user") // grabs snapshot of collection, after updating from 'firebase/firestore/lite' to 'firebase/firestore'


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
        });
}

function SignOut() {
      auth.signOut()
};

export { SignOut, auth, firestore, querySnapshot, signInWithGoogle };

