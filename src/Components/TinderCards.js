import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import firebase from 'firebase/compat/app';
import { auth, firestore } from "../firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getDoc, where, query, collection, getDocs, doc, setDoc, Timestamp, addDoc } from "firebase/firestore"; 
import { getTopAnime } from "../Api/animeapi";

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

const anime_map = []
async function getAllAnimeTitleFromDb() {
  try {
    //const usersCollectionRef = collection(firestore, 'users');
    
    // Create a query to get documents where the age field is greater than the threshold
    //const q = query(usersCollectionRef, where('animeTitle'));
    
    // old const querySnapshot = await getDocs(q);

    const querySnapshot = await getDocs(collection(firestore, 'users'))
    querySnapshot.forEach(doc => {
      console.log(doc.data().animeTitle)
      anime_map.push(doc.data().animeTitle.toString())
    });

  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// if title in history/database, remove from the available list
const anime_array = []
const anime_titles = []
getTopAnime()
  .then(responseData => {
    for (var i=0; i<responseData.data.length; i++) {
        anime_array.push(responseData.data[i])
        anime_titles.push(responseData.data[i].title)
      }
  })

 getAllAnimeTitleFromDb()

 console.log(anime_titles)
 console.log(anime_map)
 console.log(anime_array)

 anime_titles += anime_map
 console.log(anime_titles)
 function removeDuplicates(array1, array2) {
  const combinedArray = array1.concat(array2);
  const uniqueArray = Array.from(new Set(combinedArray));
  console.log(combinedArray)
  return uniqueArray;
}

const result1 = removeDuplicates(anime_titles, anime_map);
console.log(result1)

// make sure to update the rules on firebase from false to true, based on timeframe to open
// Need to find a way to add to firebase
async function onSwipe(direction, anime) {
  if (direction == 'left') {
    direction = false
  } else {
    direction = true
  }
  const { uid, photoURL } = auth.currentUser;
  console.log("anime title", anime)
  console.log("anime title", direction)
  console.log("uid", uid)
  console.log("PhotoURL", photoURL)
// new way to add document to firestore database
  await addDoc(collection(firestore, 'users'), { // Always needs even number of 'user', 'user' arguments, what you are extracting from firestore db
      //text: direction,
      //date: Timestamp,
      animeTitle: anime,
      like: direction,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: uid,
      photo: photoURL
  });
  console.log("liked: " + direction);
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
                {anime.title}
              </Typography>
            <Typography className={classes.text}> {/*anime.score*/} </Typography>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default TinderCards;
