const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/userControllers');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const urlValidate = require('./utils/validate');

// Слушаем 3000 порт
const PORT = process.env.PORT || 3000;
const app = express();

// подключаемся к серверу mongo
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
  });

app.use(express.json());

// роуты, не требующие авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValidate),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', routerUsers);
app.use('/cards', routerCards);

// несуществующие роуты
app.use('*', () => {
  throw new NotFoundError({ message: 'Страницы не существует' });
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
