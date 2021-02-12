import preloader from "../../../assets/images/48083.gif";
import React from "react";

export let Preloader = () => {
    return (
        <div style={{backgroundColor: "yellow"}}>
            <img src={preloader}/>
        </div>
    )
}