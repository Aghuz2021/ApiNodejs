const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

//CONTROLLERS
const loginController = require("./controller/login");
const catController = require("./controller/inCat");
const marcaController = require("./controller/inMarca");
const prodController = require("./controller/inProd");
const subCatController = require("./controller/inSubCat");
const userController = require("./controller/inUser");

const app = express();

//Este Middleware que nos permite express es para validar informacion de manera previa

//Ejecución de Middlewares. Tienen que estar en el orden correcto según indica el next de cada uno
app.use(cors());
app.use(express.json()); //Procesar el body. Le estoy diciendo que el body que va a recibir esta en json y si está en json la interpreta

app.use(middleware.consoleData);
app.use(middleware.processToken);

//COMPONENTES de Endpoints y sus Controladores
app.use("/cat", catController);
app.use("/marca", marcaController);
app.use("/prod", prodController);
app.use("/sCat", subCatController);
app.use("/user", userController);

//LOGIN
app.use("/login", loginController);

app.use(middleware.unkEP);
module.exports = app;
