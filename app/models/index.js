const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.group = require("../models/group.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles_groups",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.group.belongsToMany(db.user, {
    through: "user_roles_groups",
    foreignKey: "groupId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles_groups",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId", targetKey: "id"
});
db.user.hasOne(db.refreshToken, {
    foreignKey: "userId", targetKey: "id"
});

db.ROLES = ["Admin", "Gestor", "Membro"];
db.GROUPS = ["Colih Osasco", "Colih Alto Tiete"];

module.exports = db;