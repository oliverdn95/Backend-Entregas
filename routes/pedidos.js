const Entregadores = require("../database/entregadores");
const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

//Pesquisa todos pedidos
router.get("/pedidos", async (req, res) => {
    const listarPedidos = await Pedidos.findAll();

    res.json(listarPedidos);
});

//Pesquisa um pedidos
router.get("/pedidos/:id", async (req, res) => {
    const listaPedido = await Pedidos.findByPk(req.params.id);

    try {
        if (listaPedido) {
            res.status(200).json(listaPedido);
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

//Adiciona um novo pedidos
router.post("/pedidos", async (req, res) => {
    const { endereco, urgencia, refeicao, cliente, restaurante } = req.body;

    try {

        const novoPedido = await Pedidos.create({ endereco, urgencia, refeicao, cliente, restaurante });
        res.status(201).json(novoPedido);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

//Editar um pedido
router.put("/pedidos/:id", async (req, res) => {
    const { endereco, urgencia, refeicao, cliente, restaurante } = req.body;

    try {
        const pedidoEncontrado = await Pedidos.findByPk(req.params.id);

        if (pedidoEncontrado) {
            pedidoEncontrado.update({ endereco, urgencia, refeicao, cliente, restaurante });
            res.status(200).json(pedidoEncontrado);
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

//Deletar um pedido
router.delete("/pedidos/:id", async (req, res) => {

    try {
        const pedidoEncontrado = await Pedidos.findByPk(req.params.id);

        if (pedidoEncontrado) {
            pedidoEncontrado.destroy();
            res.status(200).json({ message: "Pedido deletado!" });
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

//Deletar PERMANENTEMENTE um pedido
router.delete("/pedidos/deletar/:id", async (req, res) => {

    try {
        const pedidoEncontrado = await Pedidos.findByPk(req.params.id);

        if (pedidoEncontrado) {
            pedidoEncontrado.destroy({ force: true });
            res.status(200).json({ message: "Pedido deletado!" });
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

//Restaurar o pedido deletado(Paranoid)
router.delete("/pedidosRestaurar/:id", async (req, res) => {

    try {
        const restaurarPedido = await Pedidos.findByPk(req.params.id, { paranoid: false }); // buscando o pedido excluído sem o Paranoid
        if (restaurarPedido) {
            await restaurarPedido.restore(); // restaurando o pedido excluído
            res.status(200).json({ message: `Pedido com o id ${req.params.id} foi restaurado com sucesso!` });
        } else {
            res.status(404).json({ message: `Pedido com o id ${req.params.id} não foi encontrado.` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});


module.exports = router;