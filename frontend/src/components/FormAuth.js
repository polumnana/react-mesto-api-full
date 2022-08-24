import React from "react";

function FormAuth(props){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(evt){
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt){
        setPassword(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        props.onSubmit({email, password});
    }

    return(
        <section className="auth">
            <h2 className="auth__title">{props.title}</h2>
            <form
                className={`auth__form popup__form_${props.name}`}
                onSubmit={handleSubmit}
                name={props.name} >

                <input
                    className="auth__input auth__input_form-email"
                    type="email"
                    onChange={handleChangeEmail}
                    id="email-input"
                    placeholder="Email"
                    name="email"
                    minLength="4"
                    maxLength="40"
                    value={email}
                    required />
                <span className="auth__type-input-error email-input-error"></span>
                <input
                    className="auth__input auth__input_form-password"
                    type="password"
                    onChange={handleChangePassword}
                    id="password-input"
                    placeholder="Пароль"
                    name="password"
                    minLength="6"
                    maxLength="200"
                    value={password}
                    required />
                <span className="auth__input_type-error password-input-error"></span>
                <button
                    className={`auth__form-submit auth__form-submit_${props.name}`}
                    type="submit"
                    >{props.submitButtonName}
                </button>
                {props.children}
            </form>
        </section>
    )
}

export default FormAuth;