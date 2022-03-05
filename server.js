const express = require("express");
const cors = require("cors");



const app = express();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//parse request of content-type - application/json
app.use(express.json());

//parse request of content-type - application/x-www-formurlencoded
app.use(express.urlencoded({ extended: true }));



//database
const db = require("./app/models");
// const Role = db.role;
// const Group = db.group;


db.sequelize.sync()
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo ao sistema" })
})

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


//port, list, requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.create({
        id: 1,
        name: "Admin",
    });

    Role.create({
        id: 2,
        name: "Gestor",
    });

    Role.create({
        id: 3,
        name: "Membro",
    });
}