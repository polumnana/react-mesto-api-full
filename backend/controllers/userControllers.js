const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const ConflictError = require('../errors/ConflictError');
const ErrorsDescription = require('../errors/ErrorsDescription');
const Statuses = require('../utils/statuses');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(Statuses.ok).send(users);
    })
    .catch(() => {
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((userFound) => {
      if (userFound) {
        next(new ConflictError(ErrorsDescription[409]));
        return;
      }

      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .then((user) => {
              res.status(Statuses.created).send({
                name: user.name, about: user.about, avatar: user.avatar, email: user.email,
              });
            })
            .catch((err) => {
              if (err.code === 11000) {
                next(new ConflictError(ErrorsDescription[409]));
                return;
              }
              if (err.name === 'ValidationError') {
                next(new BadRequestError(ErrorsDescription[400]));
                return;
              }
              next(new InternalServerError(ErrorsDescription[500]));
            });
        });
    })
    .catch(() => {
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send(user);
    })
    .catch(() => {
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ErrorsDescription[404]));
        return;
      }
      res.status(Statuses.ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ErrorsDescription[400]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'arelisivx',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'UnauthorizedError') {
        next(new UnauthorizedError(ErrorsDescription[401]));
        return;
      }
      next(new InternalServerError(ErrorsDescription[500]));
    });
};
