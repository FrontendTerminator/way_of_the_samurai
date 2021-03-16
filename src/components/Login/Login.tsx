import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        /* handleSubmit функция из библиотеки form */
            <form onSubmit={props.handleSubmit}>
                <div>
                    {/* Field контейнерная компонента из redux-form */}
                    <Field placeholder={"Login"} name={"login"}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

// HOC reduxForm()() вначале настраивает, а потом вызывает hoc

const LoginReduxForm = reduxForm<FormDataType>({
    // каждая форма должна иметь уникальное имя
    form: 'login'
})(LoginForm)

export const Login: React.FC = () => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}