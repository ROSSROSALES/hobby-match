import 'firebase/compat/firestore';
import { useEffect, useState } from 'react';
import { firestore, querySnapshot, getuserdata } from "../firebase";
import { doc, getDocs, deleteDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import './History.css';
import { DiscFull } from '@material-ui/icons';


// import a map from userdata, and return the list

function History() {
    // need to figure out exactly what firebase is returning,
    // clear out the data we have next time we have access
    // we want to be able to pull specifically the data into JSON so its easier to read
    // console.log("fire is JSON", firestore.toJSON())

    // Search USER, return the titles of the animes into list 
    
    const [anime, setAnime] = useState([])
    const colRef = collection(firestore, "users")
    //doc(collection(firestore, "users")).id
    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
                let anime = []
                snapshot.docs.forEach((doc) => {
                    anime.push({ id: doc.id, ...doc.data()})
                    // doc_data = {doc.data(), id:doc.id}
                    //console.log("This is the doc data", doc.data())
                    
                })
                setAnime(anime)
            //console.log("This is snapshot of collection data \n", snapshot.docs) // returns an array of objects
            });
        }, []);

    function deleteCell(id) {
        console.log("delete cell, ${id}")
        // Updates the local list of anime to remove the item.id, and rerenders the react component to reflect changes
        const newanime = anime.filter((item) => item.id !== id);
        setAnime(newanime);

        // calls upon firestore and deletes from database
        deleteDoc(doc(firestore, "users", id));
        
    };
    


    return (
        <div className="list">
            {anime.length > 0 ? (
                anime.map((doc) => 
                <div className="partlist" key={doc.id}>
                    {doc.animeTitle} 
                    <div class="cont">  
                        <button class="button" onClick={() => deleteCell(doc.id)}>
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
