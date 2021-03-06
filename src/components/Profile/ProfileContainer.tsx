import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, savePhoto, updateStatus} from "../../redux/Profile-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorisedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}
type PathParamsType = { // типизация параметра для withRouter - RouteComponentProps<PathParamsType>
    userId: string
}
type ProfileContainerType = RouteComponentProps<PathParamsType> & MapDispatchPropsType & MapStatePropsType

class ProfileContainer extends React.Component<ProfileContainerType, ProfileType> {

    refreshProfile() {
// если у нас нет айди, когда мы просто перешли в profile по пути /profile тогда говорим что бы айди по умолчанию было authorisedUserId
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(this.props.authorisedUserId)
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: StateStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*// custom Hoc from folder hoc
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// функция withRouter создаёт контейнер и передаёт через пропсы данные из url
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// контейнер для redux, который получает также инфу по URL
export default connect(mapStateToProps, {profileThunk: getUserProfile})(WithUrlDataContainerComponent)*/
