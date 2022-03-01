const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Acesso não autorizado! Token expirado!" })
    }
    return res.sendStatus(401).send({ message: "Não autorizado!" })
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Nenhum token fornecido!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Perfil de Admin requerido!"
            });
            return;
        });
    });
};

isGestor = async (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Gestor") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Perfil de Gestor requerido!"
            });
        });
    });
};

isGestorOrAdmin = async (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Gestor") {
                    next();
                    return;
                }

                if (roles[i].name === "Admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Perfil Adm ou Gestor requerido!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isGestor: isGestor,
    isGestorOrAdmin: isGestorOrAdmin
};
module.exports = authJwt;