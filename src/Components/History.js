import 'firebase/compat/firestore';
import { useEffect, useState } from 'react';
import { firestore, querySnapshot, getuserdata } from "../firebase";
import { doc, getDocs, getDoc, collection, onSnapshot } from "firebase/firestore";
import './History.css';

// import a map from userdata, and return the list

function History() {
    // need to figure out exactly what firebase is returning,
    // clear out the data we have next time we have access
    // we want to be able to pull specifically the data into JSON so its easier to read
    //console.log("fire is JSON", firestore.toJSON())
    // Search USER, return the titles of the animes into list 
    const [anime, setAnime] = useState([])
    const colRef = collection(firestore, "users")
    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
                let anime = []
                snapshot.docs.forEach((doc) => {
                    anime.push({ ...doc.data() })
                })
                console.log(anime)
                setAnime(anime)
            //console.log("This is snapshot of collection data \n", snapshot.docs) // returns an array of objects
            });
        }, []);


    //let documents = [{id:1, touch:"90000"}, {touch:"80000"}, {touch:"70000"}] // create new array to hold the data properties
    //let animetitles1 = []
    //getDocs(querySnapshot)
    //.then((snapshot) => {
    //console.log("This is snapshot of collection data \n", snapshot.docs) // returns an array of objects
    //snapshot.docs.forEach((doc) => {
    //    console.log("data is being pushed", doc)
    //    documents.push({ ...doc.data(), id: doc.id }) // create a new object to store into documents array
    //    //setuserData({ ...doc.data(), id: doc.id })
    //    if (doc.data().animetitle) {
    //        animetitles.push({ ...doc.data().animetitle, id: doc.id })
    //    }
    //})
    //})
    //.catch(err => {
    //    console.log(err.message)
    //})


    return (
        <div className="list">
            Hello
            {anime.length > 0 ? (
                anime.map((doc) => 
                <div className="partlist" key={doc.id}>
                    {doc.animeTitle} 
                    <div class="cont">  
                        <button class="button">
                            <span>Delete</span>
                            <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62"/>
                        </button>
                    </div>
                </div>)
                ) : (
                    <h1> no data yet </h1>
                )
            }
            
            
        </div>
    );
};

export default History;

/* 
{userdata.length > 0 ? (
                userdata.map((doc) => 
                <div className="partlist" key={doc.id}>
                    {doc.title} 
                    <div class="cont">  
                        <button class="button">
                            <span>Delete</span>
                            <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62"/>
                        </button>
                    </div>
                </div>)
                ) : (
                    <h1> no data yet </h1>
                )
            }
            */
