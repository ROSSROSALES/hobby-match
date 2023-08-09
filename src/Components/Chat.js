import React, { useRef, useState } from 'react';
import './Chat.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, orderBy, query, limit, addDoc, getDocs } from "firebase/firestore"; 

function Chat() {
  return (
    <div className="Chat">
      <section>
        {<ChatRoom />}
      </section>
    </div>
  );
};


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  console.log(messagesRef)
  const query1 = query(messagesRef, orderBy('createdAt'), limit(25));
  // const q = query(citiesRef, orderBy("name", "desc"), limit(3));
  const [messages] = useCollectionData(query1, { idField: 'id' });
  //

  const querySnapshot = getDocs(query1);
  console.log("What is this info after getDocs gotta wait when quota is not exceeded", querySnapshot)

//    querySnapshot.forEach((doc) => {
//    console.log(doc.id, " => ", doc.data());
//});
  console.log("This is QUERY:", query1)
  const [formValue, setFormValue] = useState('');

  const { uid, photoURL } = auth.currentUser;

  const sendMessage = async (e) => {
    e.preventDefault();


    // OLD     await messagesRef.add({
    // addDoc(collection(firestore, 'users'), {
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://pic.onlinewebfonts.com/thumbnails/icons_193221.svg'} />
      <p>{text}</p>
    </div>
  </>)
}

export default Chat;
