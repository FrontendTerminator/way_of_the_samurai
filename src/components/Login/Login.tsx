import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import {StateStoreType} from "../../redux/redux-store";
import style from './../Common/FormsControls/FormsControls.module.css'

type TypeCaptcha = {
    captchaUrl: string
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType, TypeCaptcha> & TypeCaptcha> = (props) => {

    return (
        /* handleSubmit функция из библиотеки form */
        <form onSubmit={props.handleSubmit}>
            <div>
                {/* Field контейнерная компонента из redux-form */}
                <Field placeholder={"Email"} name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={'password'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me
            </div>

            { props.captchaUrl  && <div><img className={style.captchaImage} src={props.captchaUrl}/></div> }
            { props.captchaUrl && <Field component={"input"}
                                      placeholder={"anti bot symbols"}
                                      validate={[required]}
                                      name={"captcha"}/> }

            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

// HOC reduxForm()() вначале настраивает, а потом вызывает hoc

const LoginReduxForm = reduxForm<FormDataType, TypeCaptcha>({
    // каждая форма должна иметь уникальное имя
    form: 'login'
})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captcha: string | null
}
const Login: React.FC<LoginPropsType> = (props) => {

    let validCaptcha = ""
    if (props.captcha !== null) {
        validCaptcha = props.captcha
    }

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {return <Redirect to={'/profile'}/>}

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={validCaptcha}/>
        </div>
    )
}

const mapStateToProps = (state: StateStoreType) => {
    return {
        captcha: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login)