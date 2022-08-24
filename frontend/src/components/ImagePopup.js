import React from "react";
import imageClose from "../images/Close_edit_Icon.svg"

class ImagePopup extends React.Component {
    render() {
        const classesList = this.props.isOpened ? "popup popup_opened" : "popup";
        return (
            <section className={classesList}>
                <div className="popup__preview">
                    <img
                        className="popup__img"
                        src={this.props.image}
                        alt={this.props.title}/>
                    <p className="popup__text">{this.props.title}</p>
                    <button
                        onClick={this.props.onClose}
                        type="reset"
                        className="popup__close-form popup__close-form_preview">
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

export default ImagePopup;