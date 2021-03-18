import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/Auth-reducer";

type HeaderContainerType = {
    getAuthUserData: () => void
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerType, unknown> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

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

export default connect(MapStateToProps, {getAuthUserData, logout})(HeaderContainer)
