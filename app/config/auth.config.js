module.exports = {
    secret: process.env.TOKEN_SECRET_KEY,
    jwtExpiration: 60,
    jwtRefreshExpiration: 3600,
};