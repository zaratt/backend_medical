module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        groupname: {
            type: Sequelize.STRING
        }
    });

    return Group;
};