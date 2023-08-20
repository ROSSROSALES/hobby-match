import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import firebase from 'firebase/compat/app';
import { auth, firestore } from "../firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { collection, getDocs, doc, setDoc, Timestamp, addDoc } from "firebase/firestore"; 

const useStyles = makeStyles({
  card: {
    position: "relative",
    width: "600px",
    maxWidth: "75vw",
    height: "75vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    backgroundColor: "white"
  },
  image: {
    position: "relative",
    height: "75vh",
    borderRadius: "7px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "10vh"
  },
  swipe: {
    position: "absolute"
  },
  title: {
    font: "Verdana, sans-serif",
    position: "center",
    margin: 10,
    color: "black"
  },
  text: {
    font: "Verdana, sans-serif",
    margin: 5,
    variant: "p3",
    color: 'black',
    position: "right",
  }
});

const anime_array = []
function response() {
 fetch("https://api.jikan.moe/v4/top/anime?page=2&limit=25")
 .then(response => response.json())
 .then(function(result) {
   for (var i=0; i<result.data.length; i++) {
    console.log(result.data[i].title);
    anime_array.push(result.data[i])
   }
 })
 .catch(error => console.error(error));
 };
response()
//
// make sure to update the rules on firebase from false to true, based on timeframe to open
async function onSwipe(direction, anime) {
  if (direction == 'left') {
    direction = false
  } else {
    direction = true
  }
  const { uid, photoURL } = auth.currentUser;

// new way to add document to firestore database
  await addDoc(collection(firestore, 'users'), { // Always needs even number of 'user', 'user' arguments, what you are extracting from firestore db
      animeTitle: anime,
      like: direction,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: uid,
      photo: photoURL
  });
};

function TinderCards() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {anime_array.map((anime) => (  
        <TinderCard
          className={classes.swipe}
          onSwipe={(direction) => onSwipe(direction, anime.title)}
          
          preventSwipe={["up", "down"]}
          key={anime.title}
          backgroundColor="black"
        >
          <div className={classes.card}>
            <div
              style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
              className={classes.image}
            >
            </div>
            <Typography className={classes.title} variant="h5">
                {/*anime.title*/}
              </Typography>
            <Typography className={classes.text}> {/*anime.score*/} </Typography>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default TinderCards;
