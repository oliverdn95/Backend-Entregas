const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Sequelize } = require('sequelize');

const Entregadores = require("./entregadores");

const Pedidos = connection.define("pedido", {
    endereco: { type: DataTypes.STRING, allowNull: false },
    urgencia: { type: DataTypes.STRING, allowNull: false },
    refeicao: { type: DataTypes.STRING, allowNull: false },
    cliente: { type: DataTypes.STRING, allowNull: false },
    restaurante: { type: DataTypes.STRING, allowNull: false }
}, { Sequelize, paranoid: true });

Entregadores.hasMany(Pedidos, { onDelete: "CASCADE" });
Pedidos.belongsTo(Entregadores);

module.exports = Pedidos;