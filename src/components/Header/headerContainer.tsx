import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";
import {logout} from "../../redux/Auth-reducer";

type HeaderContainerType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerType, unknown> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const MapStateToProps = (state: StateStoreType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(MapStateToProps, {logout})(HeaderContainer)
