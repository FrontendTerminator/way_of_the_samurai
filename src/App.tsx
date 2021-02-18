import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainerContext} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <NavbarContainer/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer/>}/>
                    {/*в пути пишем, чтобы он отображал params (userId), параметр для withRouters, если пути совпадут. Тут мы говорим : по айди и стамив ? - который говорит что id не обязателен*/}
                    <Route path="/Profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path={"/users"}
                           render={() => <UsersContainerContext/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

