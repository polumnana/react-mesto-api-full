import React from 'react';
import headerLogo from '../images/Logo.svg';
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom"

function Header(props) {

    const location = useLocation().pathname;

    function handleClick() {
        if (location === '/')
            props.logOut();
        else if (location === '/sign-in')
            props.register();
        else if (location === '/sign-up')
            props.logIn();
    }

    function getLinkName() {
        if (location === '/')
            return 'Выйти';
        else if (location === '/sign-in')
            return 'Регистрация';
        else if (location === '/sign-up')
            return 'Вход';
    }

    function getStyles() {
        if (location === '/')
            return 'header__signin-link header__signin-link_exit';
        else if (location === '/sign-in')
            return 'header__signin-link';
        else if (location === '/sign-up')
            return 'header__signin-link';
    }

    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Место" className="header__logo"/>
            <div className="header__user-info">
                <p className="header__email">{props.email}</p>
                <button
                    onClick={handleClick}
                    className={getStyles()}>{getLinkName()}</button>
            </div>
        </header>
    )
}

export default Header;
