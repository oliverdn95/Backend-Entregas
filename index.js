require("dotenv").config();
const express = require("express")
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");;
const morgan = require("morgan");



const app = express();

app.use(express.json());
app.use(morgan("dev"));



const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasEntregadores = require("./routes/entregadores");
const rotasPedidos = require("./routes/pedidos");
const rotasPedidosEntregas = require("./routes/pedidosentregas");
//area para rotas
app.use(rotasEntregadores);
app.use(rotasPedidos);
app.use(rotasPedidosEntregas);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer:true})
  );


app.listen(3000, () => {
    connection.sync({ force: true });
    console.log("Executando no http://localhost:3000/");
});