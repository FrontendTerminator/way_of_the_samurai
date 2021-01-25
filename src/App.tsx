import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";

type AppPropsType = {
    // state: RootStateType
    // dispatch: (action: DispatchActionType) => void
    // store: StoreType
}

const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <NavbarContainer/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer
                           />}/>
                    <Route path="/Profile"
                           render={() => <Profile
                           />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

