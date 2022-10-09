import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import firebase from 'firebase/compat/app';
import { auth, firestore } from "../firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

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
    height: "70vh",
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
    position: "absolute",
    margin: 10,
    color: "orange"
  },
  text: {
    // position: "absolute",
    margin: 5,
    variant: "p3",
    color: 'black'
  }
});

function TinderCards() {
    const [topAnime, SetTopAnime] = useState([])
    const GetTopAnime = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
        .then(res => res.json());
        console.log(temp)
        SetTopAnime(temp.top);
    }
        
    useEffect(() => {
        GetTopAnime();
        console.log("Top Anime");
    }, []);
    console.log(topAnime);

  const classes = useStyles();
  const onSwipe = async (direction) => {
    const { uid, photoURL } = auth.currentUser;
    const userRef = firestore.collection('user');
    await userRef.add({
        text: direction,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = async (myIdentifier) => {
    const { uid, photoURL } = auth.currentUser;
    const userRef = firestore.collection('user');
    await userRef.add({
        title: myIdentifier,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div className={classes.container}>
      {topAnime.map((anime) => (
        
        <TinderCard
          className={classes.swipe}
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen(anime.title)}
          preventSwipe={["up", "down"]}
          key={anime.title}
          backgroundColor="black"
        >
          <div className={classes.card}>
            <div
              style={{ backgroundImage: `url(${anime.image_url})` }}
              className={classes.image}
            >
              <Typography className={classes.title} variant="h5">
                {anime.title}
              </Typography>
            </div>
            <Typography className={classes.text}>rating: {anime.score} </Typography>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default TinderCards;
