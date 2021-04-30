import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import {StateStoreType} from "../../redux/redux-store";
import style2 from './../Common/FormsControls/FormsControls.module.css'
import pic from "../../assets/images/socialNetwork.jpg"
import style from './Login.module.scss'
import {Button} from "../Common/Button/Button";

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
        <div className={style.mainDiv}>
            <div className={style.imageBlock}>
                <img className={style.image} src={pic}/>
            </div>
            <div className={style.formBlock}>
                {/*handleSubmit функция из библиотеки form */}
                <form onSubmit={props.handleSubmit} className={style.form}>
                    <p style={{marginTop: '-15px'}}>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                    {/* Field контейнерная компонента из redux-form */}
                    <Field placeholder={"Email"} name={"email"}
                           validate={[required]}
                           component={Input}/>
                    <Field placeholder={"Password"} name={"password"} type={'password'}
                           validate={[required]}
                           component={Input}/>
                    <div className={style.field}><Field type={"checkbox"} name={"rememberMe"} component={Input}/><span
                        className={style.checkboxText}>remember me</span></div>
                    {props.captchaUrl && <div><img className={style2.captchaImage} src={props.captchaUrl}/></div>}
                    {props.captchaUrl && <Field component={"input"}
                                                placeholder={"anti bot symbols"}
                                                validate={[required]}
                                                name={"captcha"}/>}
                    {props.error && <div className={style2.formSummaryError}>
                        {props.error}
                    </div>}
                    <Button text={"Login"}/>
                </form>
                <div>
                    {/*Тестовая учётная запись для логинизации:
                    Email: free@samuraijs.com
                    Password: free*/}
                </div>
            </div>
        </div>
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

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
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