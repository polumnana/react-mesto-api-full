import buttonEdit from '../images/Edit_Button.svg';
import buttonAddPost from '../images/Add_post.svg';
import Card from "./Card.js";
import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

class Main extends React.Component {
    static contextType = CurrentUserContext;

    render() {
        return (
            <main className="content">
                <section className="profile">
                    <button
                        type="button"
                        className="profile__button-avatar"
                        onClick={this.props.openPopupAvatar}>
                        <img
                            src={this.context.avatar}
                            alt="Аватар пользователя"
                            className="profile__avatar"/>
                        <div className="profile__overlay">
                            <img
                                src={buttonEdit}
                                alt="Кнопка карандашик"
                                className="profile__edit-avatar"/>
                        </div>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__info-name">{this.context.name}</h1>
                        <button
                            type="button"
                            className="profile__button-edit"
                            onClick={this.props.openPopupEditProfile}>
                            <img src={buttonEdit} alt="Кнопка карандашик"/>
                        </button>
                    </div>
                    <p className="profile__info-about">{this.context.about}</p>
                    <button
                        type="button"
                        className="profile__button-add"
                        onClick={this.props.openPopupAddPost}>
                        <img src={buttonAddPost} alt="Кнопка плюсик"/>
                    </button>
                </section>

                <section className="elements">
                    {this.props.cards.map((card) => (
                        <Card
                            onCardDelete={this.props.onCardDelete}
                            onLike={this.props.onLike}
                            onCardClick={this.props.onCardClick}
                            card={card}
                            key={card._id}/>
                    ))}
                </section>
            </main>
        );
    }


}

export default Main;