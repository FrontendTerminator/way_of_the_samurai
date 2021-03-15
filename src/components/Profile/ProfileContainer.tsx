import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, setUsersProfile, updateStatus} from "../../redux/Profile-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void

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
            userId = "12618"
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state: StateStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)



// // custom Hoc from folder hoc
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// // функция withRouter создаёт контейнер и передаёт через пропсы данные из url
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// // контейнер для redux, который получает также инфу по URL
// export default connect(mapStateToProps, {profileThunk: getUserProfile})(WithUrlDataContainerComponent)
