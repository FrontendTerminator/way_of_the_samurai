import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";



const App: React.FC<any> = (props) => {
    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Navbar sidebar={props.state.sidebar}/>
                <div className={"app-wrapper-content"}>
                    <Route path="/dialogs"
                           render={() => <Dialogs
                               dialogsPage={props.state.dialogsPage}
                               addMessage={props.addMessage}
                               addMessageInState={props.addMessageInState}
                           />}/>
                    <Route path="/Profile"
                           render={() => <Profile
                               profilePage={props.state.profilePage}
                               addPost={props.addPost}
                               updateNewPostText={props.updateNewPostText}
                           />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

