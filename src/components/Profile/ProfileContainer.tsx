import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, ProfileType, setUsersProfile} from "../../redux/Profile-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
    profile: ProfileType | null
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
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
// custom Hoc from folder hoc
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state: StateStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

// функция withRouter создаёт контейнер и передаёт через пропсы данные из url
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// контейнер для redux, который получает также инфу по URL
export default connect(mapStateToProps, {profileThunk: getUserProfile})(WithUrlDataContainerComponent)
