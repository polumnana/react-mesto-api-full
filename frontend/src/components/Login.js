import React from "react";
import FormAuth from "./FormAuth";

function Login(props){
    function handleSubmit({email, password}){
        props.signIn({email, password});
    }

    return(
        <div className="register">
            <FormAuth
                title="Вход"
                name="signin"
                onSubmit={handleSubmit}
                submitButtonName="Войти">
            </FormAuth>
        </div>
    );
}

export default Login;