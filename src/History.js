import 'firebase/compat/firestore';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { auth, firestore  } from "./firebase";
import List from "./List"


function History() {

    const [userinfo, setuserinfo] = useState([])
    const usersCollectionRef = firestore.collection('user')

    
    useEffect(() => {
        async function getUsers() {
            const data = await getDocs(usersCollectionRef);
            console.log(data)
        }
        getUsers()
        
        }, [])
        
        

    return(
        <div>
            Hello
        </div>
    )
}

export default History;
