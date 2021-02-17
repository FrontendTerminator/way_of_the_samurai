import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUsersProfile} from "../../redux/Profile-reducer";
import {StateStoreType} from "../../redux/redux-store";


type ProfileContainerType = {
    profile: ProfileType
    setUsersProfile: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<ProfileContainerType, ProfileType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUsersProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
// need to fix any
let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUsersProfile})(ProfileContainer)
