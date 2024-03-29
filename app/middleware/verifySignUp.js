const { GROUPS } = require("../models");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Erro! Usuário já em uso!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Erro! Esse e-mail já está em uso!"
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Erro! Esse perfil não existe = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

checkGroupsExisted = (req, res, next) => {
    if (req.body.groups) {
        for (let i = 0; i < req.body.groups.length; i++) {
            if (!GROUPS.includes(req.body.groups[i])) {
                res.status(400).send({
                    message: "Erro! Esse grupo não existe! = " + req.body.groups[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;