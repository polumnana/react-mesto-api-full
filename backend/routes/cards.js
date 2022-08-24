const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidate = require('../utils/validate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

router.get('/', getCards); // возвращает все карточки из базы данных;

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlValidate),
  }),
}), createCard); // создает новую карточку по переданным параметрам;

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard); // удаляет карточку по _id;

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard); // добавляет лайк карточке;

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard); // удаляет лайк c карточки;

module.exports = router;
