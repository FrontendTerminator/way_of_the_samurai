import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {StateStoreType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsTypeForRedirect = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: StateStoreType): MapStatePropsTypeForRedirect => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStatePropsTypeForRedirect) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent

}

// Создан HOC который даёт контейнерной компоненте в пропсах булевое значение isAuth, которое отвечает за авторизацию.
// если не залогинен на серваке, тогда будет редирект на логин.