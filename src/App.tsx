import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainerContext} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/headerContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/App-reducer";
import {StateStoreType} from "./redux/redux-store";
import {Preloader} from "./components/Common/Preloader/Preloader";


type AppPropsType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppPropsType, unknown> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
                <div className={"app-wrapper"}>
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className={"app-wrapper-content"}>
                        <Route path="/dialogs"
                               render={() => <DialogsContainer/>}/>
                        {/*в пути пишем, чтобы он отображал params (userId), параметр для withRouters, если пути совпадут. Тут мы говорим : по айди и стамив ? - который говорит что id не обязателен*/}
                        <Route path="/Profile/:userId?"
                               render={() => <ProfileContainer/>}/>
                        <Route path={"/users"}
                               render={() => <UsersContainerContext/>}/>
                        <Route path={"/login"}
                               render={() => <Login/>}/>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state: StateStoreType) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializeApp})(App);

