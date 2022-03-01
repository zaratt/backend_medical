exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.membroBoard = (req, res) => {
    res.status(200).send("Membro Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.gestorBoard = (req, res) => {
    res.status(200).send("Gestor Content.");
};