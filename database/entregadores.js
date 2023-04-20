const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Entregadores = connection.define("entregadores", {
    nome: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    } },
    veiculo: { type: DataTypes.STRING, allowNull: false, validate: {
        isLowercase:true
    } },
    placa: { type: DataTypes.STRING, allowNull: false, unique:true, validate: {
        len: [7,8]
    }},
    telefone: { type: DataTypes.STRING, allowNull: false, validate: {
        len: [10,15]
    }}
}, { paranoid: true });

// Pedidos.hasOne(Entregadores, { onDelete: "CASCADE" });
// Entregadores.belongsTo(Pedidos);



module.exports = Entregadores;