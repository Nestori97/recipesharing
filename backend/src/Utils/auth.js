const jwt = require('jsonwebtoken');

const getUserFromToken = (request) => {
    const authorization = request.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }
    const token = authorization.replace('Bearer ', '');

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { getUserFromToken };
