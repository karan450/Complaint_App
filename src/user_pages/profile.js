import { useEffect, useState } from "react";
import { useAuth } from "../Aunthentication"
import "../cssfiles/profile.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile(){


    const {user} = useAuth();
    const [number, setNumber] = useState();
    const [resolved, setResolved] = useState();
    const navigate = useNavigate();
    const [width, setWidth] = useState(75.2);


    useEffect(()=>{
        setWidth(15)
        axios.post("http://localhost:80/api/complaintno.php",{
            username: user,
            status: 'resolved'
        }).then(response=>{
            setNumber(response.data.sumofall)
        }).catch(error=>{
            navigate('/error',{
                state:{
                    error: error.message
                }
            })
            console.log(error);
        })

        axios.post("http://localhost:80/api/complaintno.php",{
            username: user,
            status: 'resolved'
        }).then(response=>{
            setResolved(response.data.sumofresolved)
        }).catch(error=>{
            navigate('/error',{
                state:{
                    error: error.message
                }
            })
            console.log(error);
        })

    },[])
        

    return(
        <>
         <div className="profile_container">
         
        <div className="circlecontainer">
        <div className="greetings">
                <p>Hello {user}!</p>
            </div>
                <div className="circle_wrapper">
                    
                    <div className="complaint_done" style={{borderWidth:width}}>
                    {number}
                    </div>
                    <p className="textcircle" >
                        Total Complaint
                    </p>
                    
                </div>
            
                <div className="circle_wrapper">
                    
                    <div className="complaint_resolved" style={{borderWidth:width}}>
                        {resolved}
                    </div>
                    <p className="textcircle">
                        Resolved Complaint
                    </p>
                </div>
            </div>
         </div>
        </>
    )
}