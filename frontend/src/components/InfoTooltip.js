import React from "react";
import imageClose from "../images/Close_edit_Icon.svg";
import imageSuccess from "../images/ImageSuccess.svg";
import imageFail from "../images/ImageFail.svg";


class InfoTooltip extends React.Component {
    render(){
        const classesList = this.props.isOpened ? "popup popup_opened" : "popup";
        const imgTooltip = this.props.isSuccess ? imageSuccess : imageFail;
        const altTooltip = this.props.isSuccess ? "Картинка с сообщением об успешной регистрации" : "Картинка с сообщением об ошибке";
        const textTooltip = this.props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то не так! Попробуйте еще раз!";

        return(
            <section className={classesList}>
                <div className="popup__container">
                    <img
                        src={imgTooltip}
                        alt={altTooltip}
                        className="popup__tools-img"
                    />
                    <h2 className="popup__title popup__title_tooltip-text">{textTooltip}</h2>
                    <button
                        onClick={this.props.onClose}
                        type="reset"
                        className={`popup__close-form popup__close-form_${this.props.name}`}>
                        <img
                            src={imageClose}
                            alt="Кнопка закрыть крестик"
                            className="popup__close-form-img"/>
                    </button>
                </div>
            </section>
        );
    }
}

export default InfoTooltip;