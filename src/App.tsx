import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {DispatchActionType, RootStateType, StoreType} from "./redux/state";

type AppPropsType = {
    state: RootStateType
    dispatch: (action: DispatchActionType) => void
}

const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar sidebar={props.state.sidebar}/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <Dialogs
                               dialogsPage={props.state.dialogsPage}
                               dispatch={props.dispatch}
                           />}/>
                    <Route path="/Profile"
                           render={() => <Profile
                               profilePage={props.state.profilePage}
                               dispatch={props.dispatch}
                           />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

