import axios from "axios";
import { useEffect, useState } from "react";


export default function Showdata(){
    let [user,setUser] = useState([])
    
    useEffect(() => {
        Datalao()
    },[])

    async function Datalao(){
        await axios.get("http://localhost:3003/crud/r").
        then((a)=>{
            console.log(a.data)
            setUser(a.data)
        }).catch((e)=>{
            console.log(e.message)
        })
    }


return(
    <div>
        <h1>Users Record</h1>
        <div className="container">
            <div className="row">
                {user.map((i)=>(
                <div className="mt-3 col-md-3">
                    <div class="card" key={i._id}>
                        <div class="card-body">
                            <h4 class="card-title">{i.name}</h4>
                            <p class="card-text">{i.email}</p>
                        </div>
                    </div>
                    
                </div>
))}
            </div>
        </div>
    </div>
)}
