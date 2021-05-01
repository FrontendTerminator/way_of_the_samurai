import preloader from "../../../assets/images/48083.gif";
import React from "react";
import {CircularProgress} from "@material-ui/core";

export let Preloader = () => {
    return (
        <div>
            <CircularProgress />
            {/*<img src={preloader}/>*/}
        </div>
    )
}