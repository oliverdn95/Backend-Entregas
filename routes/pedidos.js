/**
 * @swagger
 * components:
 *   schemas:
 *     Pedidos:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: bigint
 *           description: É automaticamente gerado um ID para o pedido
 *         endereco:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Endereco do Cliente
 *         urgencia:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Urgencia do Cliente
 *         refeicao:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Refeição do Cliente
 *         cliente:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Quem é o Cliente
 *         restaurante:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Restaurante que o Cliente fez pedido
 *         entregadoreId:
 *           type: bigint
 *           description: Id do Entregador
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Data que foi feito a criação do pedido
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Ultima data que foi feito atualização no pedido
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: Data de exclusão do pedido
 *       example:
 *         id: 1
 *         endereco: rua. lanche
 *         urgencia: muito urgente
 *         refeicao: lanchão
 *         cliente: dan-dan
 *         restaurante: danis
 *         createdAt: 2023-04-20T14:23:41.438Z
 *         updatedAt: 2023-04-20T14:23:41.438Z
 *         deletedAt: null
 */

const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos:
 *   get:
 *     summary: Lista todos os Pedidos
 *     tags: [Pedidos]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos'
 *     responses:
 *       200:
 *         description: Te devolve a lista com todos os Pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos'
 *  
 */
//Pesquisa todos pedidos
router.get("/pedidos", async (req, res) => {
    const listarPedidos = await Pedidos.findAll();

    res.status(200).json(listarPedidos);
});

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/excluidos:
 *   get:
 *     summary: Lista todos os Pedidos inclusive os excluídos
 *     tags: [Pedidos]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/excluidos'
 *     responses:
 *       200:
 *         description: Te devolve a lista com todos os Pedidos excluídos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/excluidos'
 *  
 */
//Pesquisa todos pedidos excluidos
router.get("/pedidos/excluidos", async (req, res) => {
    const listarPedidos = await Pedidos.findAll({ paranoid:false });

    res.status(200).json(listarPedidos);
});

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/{id}:
 *   get:
 *     summary: Detalha um Pedido
 *     tags: [Pedidos]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Pedido
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/{id}'
 *     responses:
 *       200:
 *         description: Detalhou um novo Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       404:
 *         description: Detalhou um novo Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar detalhar um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *  
 */
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

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos:
 *   post:
 *     summary: Adiciona um novo Pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos'
 *     responses:
 *       201:
 *         description: Cria um novo Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos'
 *       500:
 *         description: Aconteceu um erro ao tentar efetuar um novo Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos'
 *  
 */
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

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/{id}:
 *   put:
 *     summary: Edita um Pedido
 *     tags: [Pedidos]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/{id}'
 *     responses:
 *       200:
 *         description: Editou um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       404:
 *         description: Não foi possível encontrar o Pedido para editar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar editar um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *  
 */
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

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um novo Pedido
 *     tags: [Pedidos]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Pedido
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/{id}'
 *     responses:
 *       200:
 *         description: Deletou um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       404:
 *         description: Não foi possível encontrar o Pedido para deletar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar deletar um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/{id}'
 *  
 */
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

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/deletar/{id}:
 *   delete:
 *     summary: Deleta PERMANENTEMENTE um novo Pedido
 *     tags: [Pedidos]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Pedido
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/deletar/{id}'
 *     responses:
 *       200:
 *         description: Deletou PERMANENTEMENTE um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/deletar/{id}'
 *       404:
 *         description: Não foi possível encontrar o Pedido para deletar PERMANENTEMENTE.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/deletar/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar deletar PERMANENTEMENTE um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/deletar/{id}'
 *  
 */
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

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: O API de Entrega de comida
 * /pedidos/restaurar/{id}:
 *   put:
 *     summary: Restaura um Pedido deletado
 *     tags: [Pedidos]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Pedido
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidos/restaurar/{id}'
 *     responses:
 *       200:
 *         description: Restaurou um Pedido deletado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/restaurar/{id}'
 *       404:
 *         description: Não foi possível encontrar o Pedido deletado para restaurar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/restaurar/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar restaurar um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidos/restaurar/{id}'
 *  
 */
//Restaurar o pedido deletado(Paranoid)
router.put("/pedidos/restaurar/:id", async (req, res) => {

    try {
        const restaurarPedido = await Pedidos.findByPk(req.params.id, { paranoid: false }); // buscando o pedido excluído sem o Paranoid
        console.log(restaurarPedido);
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