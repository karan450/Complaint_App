import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Sharedlayout(){
    return(
        <>
        <Navbar/>
        <div className="body_outlet">
        <Outlet/>
        </div>
        </>
    )
}