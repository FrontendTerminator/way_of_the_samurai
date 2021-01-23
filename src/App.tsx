import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {DispatchActionType, RootStateType} from "./redux/store";
import {ReduxStoreType, StoreType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

type AppPropsType = {
    state: RootStateType
    dispatch: (action: DispatchActionType) => void
    store: StoreType
}

const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar sidebar={props.state.sidebar}/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer
                               store={props.store}
                               // dialogsPage={props.state.dialogsPage}
                               // dispatch={props.dispatch}
                           />}/>
                    <Route path="/Profile"
                           render={() => <Profile
                               store={props.store}
                               // profilePage={props.state.profilePage}
                               // dispatch={props.dispatch}
                           />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

