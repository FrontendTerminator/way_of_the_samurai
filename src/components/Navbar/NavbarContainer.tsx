import React, {Dispatch} from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";

// const NavbarContainer: React.FC<NavbarType> = (props) => {
//
//     return <StoreContext.Consumer>
//         {(store) => {
//             let state = store.getState().sidebar
//
//             return <Navbar sidebar={state}/>
//         }}
//     </StoreContext.Consumer>
// }
//
// export default NavbarContainer;

let mapStateToProps = (state: StateStoreType) => {
    return {
        sidebar: state.sidebar
    }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {

    }
}

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)