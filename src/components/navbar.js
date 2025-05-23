import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '../Aunthentication';

export default function Navbar(){
 
    let d_navbar = useRef();
    const {logout} = useAuth();
    const navigate = useNavigate();

    

    function hamburgerClicked(e){
        d_navbar.current.classList.toggle('d_active_nav')
        let naviems = document.querySelectorAll('.nav-items')
        naviems.forEach(element => {
            element.classList.toggle('nav-items_active')
        });
    }
    
    function handlelogout(){
        logout();
        navigate('/',{replace: true})
    }


    return(
        <nav className='navbar_cotainer'>
            <div className='hamburger' onClick={hamburgerClicked}>
                <div className='bar '></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </div>
                <img src={require('../images/dashlogo.png')} className="d_img" alt="couldn't load"/>    
                <ul className='d_navbar' ref={d_navbar}>
                    <div className='nav-items'>
                        <NavLink to="/dashboard" className={({isActive}) => isActive? `u_active` : ``} end>Home</NavLink></div> 
                    <div className='nav-items'>
                        <NavLink to="/dashboard/status" className={({isActive}) => isActive? `u_active ` : ``}>Check Status</NavLink></div> 
                    <div className='nav-items'>
                        <NavLink to="/dashboard/contact" className={({isActive}) => isActive? `u_active ` : ``}>Contact</NavLink></div>
                    <div className='nav-items'>
                        <a href="https://pgportal.gov.in/" target="_blank">Resources <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></div>
                    <div className='nav-items'>
                        <NavLink to="/dashboard/profile" className={({isActive}) => isActive? `u_active ` : ``}>
                            Profile</NavLink></div>
                </ul>
                <button className='logoutIcon' onClick={handlelogout}>
                    Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
        </nav>
    )
}