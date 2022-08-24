import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpened]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: about,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpened={props.isOpened}
            title="Редактировать профиль"
            name="edit-profile"
            buttonText="Сохранить">
            <input
                onChange={handleChangeName}
                id="name-input" type="text"
                className="popup__input popup__input_form-name"
                placeholder="Ваше имя" name="name"
                required minLength="2" maxLength="40"
                value={name}/>
            <span className="popup__type-input-error name-input-error"/>
            <input
                onChange={handleChangeAbout} id="about-input" type="text"
                className="popup__input popup__input_form-about"
                placeholder="Расскажите о себе..." name="about" required minLength="2"
                maxLength="200" value={about}/>
            <span className="popup__type-input-error about-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;