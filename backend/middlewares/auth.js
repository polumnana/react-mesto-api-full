const jwt = require('jsonwebtoken');
const ErrorsDescription = require('../errors/ErrorsDescription');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(ErrorsDescription.badToken);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
  // пытаемся сделать верификацию токена
    payload = jwt.verify(token, 'arelisivx');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError(ErrorsDescription.badToken);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
