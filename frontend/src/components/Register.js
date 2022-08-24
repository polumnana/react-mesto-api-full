import React from "react";
import FormAuth from "./FormAuth";
import {Link} from 'react-router-dom';

function Register(props) {

    function handleSubmit({email, password}) {
        props.signUp({email, password});
    }

    return (
        <div className="register">
            <FormAuth
                title="Регистрация"
                name="signup"
                onSubmit={handleSubmit}
                submitButtonName="Зарегистрироваться">
            </FormAuth>

            <div className="register__signin">
                <p className="register__signin-text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__signin-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;