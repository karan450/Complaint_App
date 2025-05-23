import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import "../cssfiles/adminnav.css"
import { useRef, useState } from "react";
import { useAuth } from "../Aunthentication";


export default function Adminnav(props){

    const toggler = useRef();
    const adminc = useRef();
    const [toggle, setToggle] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();
    
    function handleToggle(){
            setToggle(!toggle);
            const admincontent = document.querySelector(".adminContent")
            adminc.current.classList.toggle("admincontent_active")
            const navbar = document.querySelector(".ad_navbar")
            toggler.current.classList.toggle("toggler_active")
            navbar.classList.toggle("ad_navbar_active");
    }

    function handlelogout(){
        logout();
        navigate('/',{replace: true})
    }
    

    return(
        <>
        
            <div className="toggler" ref={toggler} onClick={handleToggle}>
                {toggle? 
                <FontAwesomeIcon icon={faXmark} /> :
                <FontAwesomeIcon icon={faBars} />}
            </div>

            <button onClick={handlelogout} className="logouticon">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>

            <div className="ad_navbar">

                <div className="navitem_warpper">
                <NavLink 
                to="/admin/water" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`}>Water Complaints
                </NavLink>
                </div>

                <div className="navitem_warpper">
                <NavLink 
                to="/admin/waste" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`}>Waste Management Complaints
                </NavLink>
                </div>

                <div className="navitem_warpper">
                <NavLink  
                to="/admin" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`} end>Electicity Complaints
                </NavLink>
                </div>

                <div className="navitem_warpper">
                <NavLink 
                to="/admin/pothole" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`}>Pothole Complaints
                </NavLink>
                </div>

                <div className="navitem_warpper">
                <NavLink 
                to="/admin/streetlight" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`}>Streetlight Complaints
                </NavLink>
                </div>
                
                <div className="navitem_warpper">
                <NavLink  
                to="/admin/createadmin" 
                className={({isActive}) => isActive? `ad_active ad_navitems` : `ad_navitems`} end>Create Admin
                </NavLink>
                </div>

            </div>
            {/* main content of all the pages */}
            <div className="adminContent" ref={adminc}>
            <Outlet/>
            </div>
        </>
    )
}