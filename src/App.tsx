import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainerContext} from "./components/Users/UsersContainer";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <NavbarContainer/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer/>}/>
                    <Route path="/Profile"
                           render={() => <Profile/>}/>
                    <Route path={"/users"}
                           render={() => <UsersContainerContext/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

