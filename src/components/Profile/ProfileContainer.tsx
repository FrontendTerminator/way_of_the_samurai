import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, ProfileType, setUsersProfile} from "../../redux/Profile-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    profileThunk: (userId: string) => void

}
type PathParamsType = { // типизация параметра для withRouter - RouteComponentProps<PathParamsType>
    userId: string
}
type ProfileContainerType = RouteComponentProps<PathParamsType> & MapDispatchPropsType & MapStatePropsType


class ProfileContainer extends React.Component<ProfileContainerType, ProfileType> {

    componentDidMount() {
// если у нас нет айди, когда мы просто перешли в profile по пути /profile тогда говорим что бы айди по умолчанию было 2
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }
        this.props.profileThunk(userId)

        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUsersProfile(response.data)
            })*/
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"} />

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: StateStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})
// функция withRouter создаёт контейнер и передаёт через пропсы данные из url
let WithUrlDataContainerComponent = withRouter(ProfileContainer)
// контейнер для redux, который получает также инфу по URL
export default connect(mapStateToProps, {profileThunk: getUserProfile})(WithUrlDataContainerComponent)
