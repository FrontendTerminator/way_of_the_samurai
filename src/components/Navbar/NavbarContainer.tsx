import React from "react";
import {StoreType} from "../../redux/redux-store";
import Navbar from "./Navbar";
import StoreContext from "../../StoreContext";

type NavbarType = {
    // store: StoreType
}

const NavbarContainer: React.FC<NavbarType> = (props) => {

    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState().sidebar

            return <Navbar sidebar={state}/>
        }}
    </StoreContext.Consumer>
}

export default NavbarContainer;