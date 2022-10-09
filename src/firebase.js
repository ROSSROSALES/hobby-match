import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

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
const user = auth.currentUser

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    
};

function SignOut() {
      auth.signOut()
};

export { signInWithGoogle, auth, firestore, user, SignOut };
