import 'firebase/compat/firestore';
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { firestore } from "../firebase";
import './History.css';

function History() {

    
    const [anime, setAnime] = useState([])
    const colRef = collection(firestore, "users")
    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
                let anime = []
                snapshot.docs.forEach((doc) => {
                    anime.push({ id: doc.id, ...doc.data()})
                    
                })
                anime = anime.filter((item) => item["like"] == true);
                setAnime(anime)
            });
        }, []);

    function deleteCell(id) {
        const newanime = anime.filter((item) => item.id !== id);
        setAnime(newanime);
        deleteDoc(doc(firestore, "users", id));
    }

    function deleteAllCells() {
        setAnime([]);
        anime.forEach(anime.map((item) => deleteDoc(doc(firestore, "users", item.id))));
    };
    
    return (
        <>
        <div className="toplist">
        <Popup trigger=
            {<button class="button">  Delete All </button>}
            modal nested>
            {
                close => (
                    <div className="popup-container">
                        <div className='DeleteAllText'>
                            Are you sure you want to delete all?
                        </div>
                        <div >
                            <button className="button-popup" onClick=
                                {() => {close(); deleteAllCells();}}>
                                    Yes
                            </button>
                        </div>
                    </div>
                )
            }
        </Popup>
        </div>
        
        
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
        </>
        
    );
};

export default History;
