import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";

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

let mapStateToProps = (state: any) => {
    return {
        sidebar: state.sidebar
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {

    }
}

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)