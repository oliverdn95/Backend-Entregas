require("dotenv").config();
const express = require("express");
const morgan = require("morgan");



const app = express();

app.use(express.json());
app.use(morgan("dev"));



const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasEntregadores = require("./routes/entregadores");
const rotasPedidos = require("./routes/pedidos");
//area para rotas
app.use(rotasEntregadores);
app.use(rotasPedidos);


app.listen(3000, () => {
    connection.sync({ force: true });
    console.log("Executando no http://localhost:3000/");
});