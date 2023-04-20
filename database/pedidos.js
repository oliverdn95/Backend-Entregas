const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Sequelize } = require('sequelize');

const Entregadores = require("./entregadores");

const Pedidos = connection.define("pedido", {
    endereco: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    } },
    urgencia: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    }},
    refeicao: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    }},
    cliente: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    }},
    restaurante: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    }}
}, { Sequelize, paranoid: true });

Entregadores.hasMany(Pedidos, { onDelete: "CASCADE" });
Pedidos.belongsTo(Entregadores);

module.exports = Pedidos;