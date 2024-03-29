import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import 'firebase/compat/analytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { addDoc, collection, getDocs } from "firebase/firestore";
import React from "react";
import TinderCard from "react-tinder-card";
import { getTopAnime } from "../Api/animeapi";
import { auth, firestore } from "../firebase";

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
    // position: "absolute",
    font: "Verdana, sans-serif",
    margin: 5,
    variant: "p3",
    color: 'black',
    position: "right",
  }
});
const anime_set = new Set()
const anime_map = []
async function getAllAnimeTitleFromDb() {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'))
    querySnapshot.forEach(doc => {
      console.log(doc.data().animeTitle)
      anime_map.push(doc.data().animeTitle.toString())

      anime_set.add(doc.data().animeTitle.toString())
    });

  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// if title in history/database, remove from the available list
const anime_array = []
getTopAnime()
  .then(responseData => {
    for (var i=0; i<responseData.data.length; i++) {
        anime_array.push(responseData.data[i])
        anime_map.push(responseData.data[i].title)

        anime_set.add(responseData.data[i].title)
      }
  })

 getAllAnimeTitleFromDb()
const myArray = Array.from(anime_set)
async function onSwipe(direction, anime) {
  if (direction == 'left') {
    direction = false
  } else {
    direction = true
  }
  const { uid, photoURL } = auth.currentUser;

  await addDoc(collection(firestore, 'users'), {

      animeTitle: anime,
      like: direction,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: uid,
      photo: photoURL
  });
  console.log("liked: " + direction);
};


function Cards() {

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
                {/* {anime.title} */}
              </Typography>
            <Typography className={classes.text}> {/*anime.score*/} </Typography>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default Cards;
