import { NavLink } from "react-router-dom";
import Pending from "./pending";
import "../cssfiles/adminstatus.css"
import Inprogress from "./inprogress";
import Resolved from "./resolved";
import { useEffect, useState } from "react";
import Onhold from "./onhold";

export default function Adminstatus(props){

    // using active state to see which page is active! 1=pending 2=inprogress 3=resolved
    const [active, setActive] = useState(1)


    function onpending(){
        setActive(1);
    }

    function onhold(){
        setActive(2)
    }

    function oninprogress(){
        setActive(3);
    }

    function onresolved(){
        setActive(4);
    }
    

    let componentToRender;
        if (active === 1) {
            componentToRender = <Pending title={props.title} table={props.table} />;
        } else if (active === 2) {
            componentToRender = <Onhold title={props.title} table={props.table} />;
        } else if(active == 3){
            componentToRender = <Inprogress title={props.title} table={props.table} />;
        }else{
            componentToRender = <Resolved title={props.title} table={props.table}/>;
        }
    

    return(
        <>
            <h1 className="ad_pagetitle">{props.title}</h1>
                <div className="navigation_wrapper">
                    <button onClick={onpending} 
                    className={active===1? "active__button navigation__button" :"navigation__button"}>
                        PENDING
                    </button>

                    <button onClick={onhold} 
                    className={active===2? "active__button navigation__button" :"navigation__button"}>
                        ON HOLD
                    </button>

                    <button onClick={oninprogress} 
                    className={active===3? "active__button navigation__button" :"navigation__button"}>
                        IN PROGRESS
                    </button>

                    <button onClick={onresolved} 
                    className={active===4? "active__button navigation__button" :"navigation__button"}>
                        RESOLVED
                    </button>
                </div>
                
                {componentToRender}
        </>
    )
}