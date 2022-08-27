import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from "../utils/api";
import apiAuth from "../utils/apiAuth";

import avatar from "../images/Avatar.jpg";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { withRouter } from "./withRouter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isImagePopupOpen: false,
            isInfoTooltipIsOpen: false,
            selectedCard: null,
            currentUser: {
                name: "Жак-Ив Кусто",
                about: "Исследователь океана",
                avatar: avatar,
            },
            loggedIn: false,
            registerSuccess: false,
            email: "",
        }
        this.closeAllPopups = this.closeAllPopups.bind(this);
        this.openPopupAvatar = this.openPopupAvatar.bind(this);
        this.openPopupEditProfile = this.openPopupEditProfile.bind(this);
        this.openPopupAddPost = this.openPopupAddPost.bind(this);
        this.openPopupPreview = this.openPopupPreview.bind(this);
        this.handleInfoTooltip = this.handleInfoTooltip.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleCardLike = this.handleCardLike.bind(this);
        this.handleCardDelete = this.handleCardDelete.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.checkUserToken = this.checkUserToken.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.navigateLogIn = this.navigateLogIn.bind(this);
        this.navigateRegister = this.navigateRegister.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        this.updateCurrentUser();
    }

    updateCurrentUser() {
        api.fetchUserInfo()
            .then(result => {
                this.setState({
                    currentUser: result,
                });
            }
            )
            .catch(err => {
                console.log(err);
            });
        api.fetchCards()
            .then((cards) => {
                this.setCards(cards);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

        this.checkUserToken();
    }

    setCards(cards) {
        this.setState({
            cards: cards,
        });
    }

    handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === this.state.currentUser._id);
        const action = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
        action
            .then((newCard) => {
                this.setCards(this.state.cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

    }

    handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                this.setCards(this.state.cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then(result => {
                    this.setState({
                        currentUser: result,
                    });
                    this.closeAllPopups();
                }
            )
            .catch(err => {
                console.log(err);
            });
    }

    handleAddCard(data) {
        api.createCard(data)
            .then((card) => {
                    this.setCards([card, ...this.state.cards]);
                    this.closeAllPopups();

                }
            )
            .catch(err => {
                console.log(err);
            });
    }

    handleUpdateAvatar(data) {
        api.updateUserAvatar(data.avatar)
            .then(result => {
                    this.setState({
                        currentUser: result,
                    });
                    this.closeAllPopups();
                }
            )
            .catch(err => {
                console.log(err);
            });
    }

    handleSignUp({email, password}) {
        apiAuth.signup({email, password})
            .then((result) => {
                this.handleInfoTooltip(true);
                this.props.navigate('/sign-in');
            })
            .catch((err) => {
                this.handleInfoTooltip(false);
            });
    }

    handleSignIn({email, password}) {
        apiAuth.signin({email, password})
            .then((result) => {
                if (result.token) {
                    localStorage.setItem('jwt', result.token);
                    this.setState({
                        email: email,
                        loggedIn: true,
                        token: result.token,
                    });
                    this.props.navigate('/');
                    this.updateCurrentUser();
                }
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    handleLogOut(){
        localStorage.removeItem('jwt');
        this.setState({
            email: "",
        });
        this.props.navigate('/sign-in');
    }

    navigateLogIn(){
        this.props.navigate('/sign-in');
    }

    navigateRegister() {
        this.props.navigate('/sign-up');
    }

    checkUserToken() {
        const token = localStorage.getItem('jwt');
        if (token) {
            apiAuth.checkToken(token)
                .then((result) => {
                    if (result) {
                        this.setState({
                            loggedIn: true,
                            email: result.email,
                        });
                        this.props.navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        }
    }


    closeAllPopups() {
        this.setState(
            {
                isEditProfilePopupOpen: false,
                isAddPlacePopupOpen: false,
                isEditAvatarPopupOpen: false,
                isImagePopupOpen: false,
                isInfoTooltipIsOpen: false,
                selectedCard: null,
            }
        );
    }

    openPopupAvatar() {
        this.setState(
            {
                isEditAvatarPopupOpen: true,
            }
        );
    }

    openPopupEditProfile() {
        this.setState(
            {
                isEditProfilePopupOpen: true,
            }
        );
    }

    openPopupAddPost() {
        this.setState(
            {
                isAddPlacePopupOpen: true,
            }
        );
    }

    handleInfoTooltip(result) {
        this.setState(
            {
                registerSuccess: result,
                isInfoTooltipIsOpen: true,
            }
        );
    }

    openPopupPreview(card) {
        this.setState(
            {
                isImagePopupOpen: true,
                selectedCard: card,
            }
        );
    }

    render() {
        const name = this.state.selectedCard == null ? "" : this.state.selectedCard.name;
        const link = this.state.selectedCard == null ? "" : this.state.selectedCard.link;

        return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <div className="page">
                    <Header
                        email={this.state.email}
                        logOut={this.handleLogOut}
                        logIn={this.navigateLogIn}
                        register={this.navigateRegister}
                    />

                    <Routes>
                        <Route
                            element={<Register signUp={this.handleSignUp}/>}
                            path="/sign-up"
                        />
                        <Route
                            element={<Login signIn={this.handleSignIn}/>}
                            path="/sign-in"

                        />
                        <Route path="/"
                               element={
                                   <ProtectedRoute loggedIn={this.state.loggedIn}>
                                       <Main
                                           onCardClick={this.openPopupPreview}
                                           openPopupEditProfile={this.openPopupEditProfile}
                                           openPopupAddPost={this.openPopupAddPost}
                                           openPopupAvatar={this.openPopupAvatar}
                                           onLike={this.handleCardLike}
                                           onCardDelete={this.handleCardDelete}
                                           cards={this.state.cards}
                                       />
                                       <Footer/>
                                   </ProtectedRoute>
                               }
                        />
                    </Routes>

                    <EditProfilePopup
                        isOpened={this.state.isEditProfilePopupOpen}
                        user={this.state.currentUser}
                        onClose={this.closeAllPopups}
                        onUpdateUser={this.handleUpdateUser}/>

                    <AddPlacePopup
                        isOpened={this.state.isAddPlacePopupOpen}
                        onClose={this.closeAllPopups}
                        onAddCard={this.handleAddCard}/>

                    <EditAvatarPopup
                        isOpened={this.state.isEditAvatarPopupOpen}
                        onClose={this.closeAllPopups}
                        onUpdateAvatar={this.handleUpdateAvatar}
                    />
                    <PopupWithForm
                        onClose={this.closeAllPopups}
                        title="Вы уверены?"
                        name="popup-delete"
                        buttonText="Да"/>

                    <ImagePopup
                        onClose={this.closeAllPopups}
                        isOpened={this.state.isImagePopupOpen}
                        title={name}
                        image={link}/>
                    <InfoTooltip
                        onClose={this.closeAllPopups}
                        isOpened={this.state.isInfoTooltipIsOpen}
                        isSuccess={this.state.registerSuccess}
                    />
                </div>

            </CurrentUserContext.Provider>
        );
    }
}

export default withRouter(App);
