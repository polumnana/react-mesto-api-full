const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ErrorsDescription = require('../errors/ErrorsDescription');
const InternalServerError = require('../errors/InternalServerError');
const Card = require('../models/card');
const Statuses = require('../utils/statuses');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(Statuses.ok).send({ data: cards });
    })
    .catch(() => {
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerCard = req.user._id;

  Card.create({ name, link, owner: ownerCard })
    .then((card) => {
      res.status(Statuses.created).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      const ownerCard = card.owner;
      const userId = req.user._id;
      if (ownerCard.toString() !== userId) {
        next(new ForbiddenError(ErrorsDescription[403]));
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((removedCard) => {
          if (!removedCard) {
            next(new NotFoundError(ErrorsDescription[404]));
            return;
          }
          res.status(Statuses.ok).send({ data: card });
        })
        .catch(() => {
          next(new InternalServerError(ErrorsDescription[500]));
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      res.status(Statuses.internalServerError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};
