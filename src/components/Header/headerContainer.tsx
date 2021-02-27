import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";
import {getAuthUserData, setAuthUserData} from "../../redux/Auth-reducer";

type HeaderContainerType = {
    authThunk: () => void
    isAuth: boolean
    login: string | null
}

class HeaderContainer extends React.Component<HeaderContainerType, unknown> {

    componentDidMount() {
        this.props.authThunk()

        /*axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true // объект который переадется вторым аргументом в запрос, чтобы отправить фай cookie, true - отправить. Если этого не сделать то не будет отправляться файл куки и не произойдёт автоматической атворизации через сервак
        }).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.setAuthUserData(id, email, login)
            }
        })*/
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

export default connect(MapStateToProps, {authThunk: getAuthUserData})(HeaderContainer)
