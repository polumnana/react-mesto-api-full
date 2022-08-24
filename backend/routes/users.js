const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserMe, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/userControllers');

const urlValidate = require('../utils/validate');

router.get('/', getUsers); // возвращает всех пользователей из базы данных;
router.get('/me', getUserMe); // возвращает пользователя из базы данных;

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById); // возвращает пользователя по переданному _id;

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo); // обновляет информацию о пользователе;

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlValidate),
  }),
}), updateUserAvatar); // обновляет аватар пользователя;

module.exports = router;
