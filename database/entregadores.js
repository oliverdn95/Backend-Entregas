const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Entregadores = connection.define("entregadores", {
    nome: { type: DataTypes.STRING, allowNull: false },
    veiculo: { type: DataTypes.STRING, allowNull: false },
    placa: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false }
}, { paranoid: true, deletedAt: 'softDelete' });

// Pedidos.hasOne(Entregadores, { onDelete: "CASCADE" });
// Entregadores.belongsTo(Pedidos);



module.exports = Entregadores;