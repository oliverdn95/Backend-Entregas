const { where } = require("sequelize");
const Entregadores = require("../database/entregadores");
const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

//rota de pesquisa de entregadores x pedidos
router.get("/pedidosconfirmados", async (req, res) => {
    const pedidosEncontrados = await Pedidos.findAll({ include: [Entregadores] });

    if(pedidosEncontrados){
        res.json(pedidosEncontrados);
    }
});

//rota de pesquisa de entregadores x pedidos
router.get("/pedidosconfirmados/:id", async (req, res) => {
    const pedidosEncontrados = await Pedidos.findOne({
        where: {id:req.params.id},
        include: [Entregadores]
    });

    if(pedidosEncontrados){
        res.json(pedidosEncontrados);
    }
});

//Atribui um pedido a um entregador
router.put("/pedidosconfirmados", async (req, res) => {
    const { entregadoreId, pedidoId } = req.body;

    try{
        const entregadorEncontrado = await Entregadores.findByPk(entregadoreId);
        const pedidoEncontrado = await Pedidos.findByPk(pedidoId);

        if(entregadorEncontrado && pedidoEncontrado){
            pedidoEncontrado.update({ entregadoreId });
            res.status(200).json(pedidoEncontrado);
        }else{
            res.status(404).json({ message: "Entregador ou Pedido não encontrado." });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

module.exports = router;