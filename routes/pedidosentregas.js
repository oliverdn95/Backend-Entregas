/**
 * @swagger
 * components:
 *   schemas:
 *     PedidosEntregas:
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
 *         pedidoId:
 *           type: bigint
 *           description: Id do Pedido
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
 *         entregadoreId: 1
 *         entregadore: {
 *          id: 1,
 *          nome: dandan,
 *          veiculo: dis,
 *          placa: ABC-1433,
 *          telefone: (99)9-9898-9898,
 *          createdAt: 2023-04-20T18:30:57.000Z,
 *          updatedAt: 2023-04-20T18:30:57.000Z,
 *          deletedAt: null
 *      }
 */
const Entregadores = require("../database/entregadores");
const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PedidosEntregas
 *   description: O API de Entrega de comida
 * /pedidosconfirmados:
 *   get:
 *     summary: Lista todos os Pedidos confirmados
 *     tags: [PedidosEntregas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidosconfirmados'
 *     responses:
 *       200:
 *         description: Te devolve a lista com todos os Pedidos confirmados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidosconfirmados'
 *  
 */
//rota de pesquisa de entregadores x pedidos
router.get("/pedidosconfirmados", async (req, res) => {
    const pedidosEncontrados = await Pedidos.findAll({ include: [Entregadores] });

    if(pedidosEncontrados){
        res.status(200).json(pedidosEncontrados);
    }
});

/**
 * @swagger
 * tags:
 *   name: PedidosEntregas
 *   description: O API de Entrega de comida
 * /pedidosconfirmados/{id}:
 *   get:
 *     summary: Detalha um Pedido
 *     tags: [PedidosEntregas]
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
 *             $ref: '#/pedidosconfirmados/{id}'
 *     responses:
 *       200:
 *         description: Detalhou um Pedido confirmado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidosconfirmados/{id}'
 *  
 */
//rota de pesquisa de entregadores x pedidos
router.get("/pedidosconfirmados/:id", async (req, res) => {
    const pedidosEncontrados = await Pedidos.findOne({
        where: {id:req.params.id},
        include: [Entregadores]
    });

    if(pedidosEncontrados){
        res.status(200).json(pedidosEncontrados);
    }
});

/**
 * @swagger
 * tags:
 *   name: PedidosEntregas
 *   description: O API de Entrega de comida
 * /pedidosconfirmados/{id}:
 *   put:
 *     summary: Detalha um Pedido
 *     tags: [PedidosEntregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/pedidosconfirmados/{id}'
 *     responses:
 *       200:
 *         description: Detalhou um Pedido confirmado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidosconfirmados/{id}'
 *       404:
 *         description: Detalhou um novo Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidosconfirmados/{id}'
 *       500:
 *         description: Aconteceu um erro ao tentar detalhar um Pedido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/pedidosconfirmados/{id}'
 *  
 */
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