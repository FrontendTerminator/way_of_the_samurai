import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainer} from "./components/Users/UsersContainer";



type AppPropsType = {
    // state: RootStateType
    // dispatch: (action: DispatchActionType) => void
    // store: StoreType
}

const App: React.FC<AppPropsType> = () => {

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
                           render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

