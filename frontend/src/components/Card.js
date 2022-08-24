import imageDelete from '../images/Delete.svg';
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

class Card extends React.Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleCardLike = this.handleCardLike.bind(this);
        this.handleCardDelete = this.handleCardDelete.bind(this);
    }

    handleCardClick() {
        this.props.onCardClick(this.props.card);
    }

    handleCardLike() {
        this.props.onLike(this.props.card);
    }

    handleCardDelete() {
        this.props.onCardDelete(this.props.card);
    }

    render() {
        // Определяем, являемся ли мы владельцем текущей карточки
        const isOwn = this.props.card.owner._id === this.context._id;

        // Создаём переменную, которую после зададим в `className` для кнопки удаления
        const cardDeleteButtonClassName = (
            `${isOwn ? 'element__delete' : 'element__delete_hidden'}`
        );
        // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
        const isLiked = this.props.card.likes.some(i => i._id === this.context._id);

        // Создаём переменную, которую после зададим в `className` для кнопки лайка
        const cardLikeButtonClassName = (
            `${isLiked ? 'element__button-like element__button-like_active' : 'element__button-like'}`
        );

        return (
            <article className="element">
                <img
                    onClick={this.handleCardClick}
                    className="element__img"
                    src={this.props.card.link}
                    alt={this.props.card.name}/>
                <h2 className="element__title">{this.props.card.name}</h2>
                <div className="element__like">
                    <button
                        onClick={this.handleCardLike}
                        type="button"
                        className={cardLikeButtonClassName}>
                    </button>
                    <span
                        className="element__counter-like">{this.props.card.likes.length}</span>
                </div>
                <button
                    onClick={this.handleCardDelete}
                    type="button"
                    className={cardDeleteButtonClassName}>
                    <img
                        src={imageDelete}
                        alt="Корзина удалить"
                        className="element__delete-img"/>
                </button>
            </article>
        );
    }
}

export default Card;