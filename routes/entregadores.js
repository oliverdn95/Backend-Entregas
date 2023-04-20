/**
 * @swagger
 * components:
 *   schemas:
 *     Entregadores:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: bigint
 *           description: É automaticamente gerado um ID para o entregador
 *         nome:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Nome do Entregador
 *         veiculo:
 *           type: string
 *           allowNull: false
 *           validate: {isLowercase: true}
 *           description: Tipo do veiculo
 *         placa:
 *           type: string
 *           allowNull: false
 *           unique: true
 *           validate: {len: [7,8]}
 *           description: Numero da placa
 *         telefone:
 *           type: string
 *           allowNull: false
 *           validate: {len: [10,15]}
 *           description: Numero do entregador
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Data que o entregador foi cadastrado na plataforma
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Ultima data que os dados do entregador foram atualizados
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: Data de exclusão do entregador
 *       example:
 *         id: 1
 *         nome: Paulo
 *         veiculo: Motocicleta
 *         placa: KKK-3456
 *         telefone: (99) 98877-3345
 *         createdAt: 2023-04-20T14:23:41.438Z
 *         updatedAt: 2023-04-20T14:23:41.438Z
 *         deletedAt: null
 */

const Entregadores = require("../database/entregadores");
const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores:
 *   get:
 *     summary: Lista todos os entregadores
 *     tags: [Entregadores]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores'
 *     responses:
 *       200:
 *         description: Te devolve a lista com todos os Entregadores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores'
 *  
 */

//Pesquisa todos entregadores
router.get("/entregadores", async (req, res) => {
    const listasEntregador = await Entregadores.findAll();
    
    res.status(200).json(listasEntregador);
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/excluidos:
 *   get:
 *     summary: Lista todos os entregadores excluídos
 *     tags: [Entregadores]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/excluidos'
 *     responses:
 *       200:
 *         description: Te devolve a lista com todos os Entregadores excluídos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/excluidos'
 *  
 */

//Pesquisa todos entregadores excluidos
router.get("/entregadores/excluidos", async (req, res) => {
    const listasEntregador = await Entregadores.findAll({ paranoid:false });
    
    res.status(200).json(listasEntregador);
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/{id}:
 *   get:
 *     summary: Lista todos os entregadores excluídos
 *     tags: [Entregadores]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Entregador
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/{id}'
 *     responses:
 *       200:
 *         description: Busca por entregador específico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       404:
 *         description: Entregador não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *  
 */

//Pesquisa um entregador
router.get("/entregadores/:id", async (req, res) => {
    const listaEntregador = await Entregadores.findByPk(req.params.id);

    try{
        if(listaEntregador){
            res.status(200).json(listaEntregador);
        }else{
            res.status(404).json({ message: "Entregador não encontrado." });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores:
 *   post:
 *     summary: Adiciona um entregador.
 *     tags: [Entregadores]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores'
 *     responses:
 *       201:
 *         description: Entregador adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores'
 *  
 */

//Adiciona um entregador
router.post("/entregadores", async (req, res) => {
    const { nome, veiculo, placa, telefone, pedidoId } = req.body;
    
    try{
        const pedido = await Pedidos.findByPk(pedidoId);

        if(pedido){
            const novoEntregador =  await Entregadores.create({ nome, veiculo, placa, telefone, pedidoId });
            res.status(201).json(novoEntregador);
        }else{
            const novoEntregador =  await Entregadores.create({ nome, veiculo, placa, telefone });
            res.status(201).json(novoEntregador);
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/{id}:
 *   put:
 *     summary: Edita um entregador.
 *     tags: [Entregadores]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Entregador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/{id}'
 *     responses:
 *       200:
 *         description: Entregador editado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       404:
 *         description: Entregador não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *  
 */

//Edita um entregador
router.put("/entregadores/:id", async (req, res) => {
    const { nome, veiculo, placa, telefone } = req.body;

    try{
        const entregadorEncontrado = await Entregadores.findByPk(req.params.id);

        if(entregadorEncontrado){
            entregadorEncontrado.update({ nome, veiculo, placa, telefone });
            res.status(200).json(entregadorEncontrado);
        }else{
            res.status(404).json({ message: "Entregador não encontrado." });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/{id}:
 *   delete:
 *     summary: Deleta um entregador.
 *     tags: [Entregadores]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Entregador
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/{id}'
 *     responses:
 *       200:
 *         description: Entregador deletado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       404:
 *         description: Entregador não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/{id}'
 *  
 */

//Deleta um entregador
router.delete("/entregadores/:id", async (req, res) => {

    try{
        const entregadorEncontrado = await Entregadores.findByPk(req.params.id);

        if(entregadorEncontrado){
            entregadorEncontrado.destroy();
            res.status(200).json({ message: "Entregador deletado!" });
        }else{
            res.status(404).json({ message: "Entregador não encontrado." });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/deletar/{id}:
 *   delete:
 *     summary: Deleta um entregador PERMANENTEMENTE.
 *     tags: [Entregadores]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Entregador
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/deletar/{id}'
 *     responses:
 *       200:
 *         description: Entregador deletado PERMANENTEMENTE.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/deletar/{id}'
 *       404:
 *         description: Entregador não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/deletar/{id}'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/deletar/{id}'
 *  
 */

//Deleta um entregador PERMANENTEMENTE
router.delete("/entregadores/deletar/:id", async (req, res) => {

    try{
        const entregadorEncontrado = await Entregadores.findByPk(req.params.id);

        if(entregadorEncontrado){
            entregadorEncontrado.destroy({ force:true });
            res.status(200).json({ message: "Entregador deletado!" });
        }else{
            res.status(404).json({ message: "Entregador não encontrado." });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});

/**
 * @swagger
 * tags:
 *   name: Entregadores
 *   description: O API de Entrega de comida
 * /entregadores/restaurar/{id}:
 *   put:
 *     summary: Restaura um entregador.
 *     tags: [Entregadores]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do Entregador
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entregadores/restaurar/{id}'
 *     responses:
 *       200:
 *         description: Entregador restaurado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/restaurar/{id}'
 *       404:
 *         description: Entregador não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/restaurar/{id}'
 *       500:
 *         description: Ocorreu um erro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/entregadores/restaurar/{id}'
 *  
 */

//Restaurar o entregador deletado(Paranoid)
router.put("/entregadores/restaurar/:id", async (req, res) => {

    try {
        const restaurarEntregador = await Entregadores.findByPk(req.params.id, { paranoid: false }); // buscando o entregador excluído sem o Paranoid
        if (restaurarEntregador) {
            await restaurarEntregador.restore(); // restaurando o entregador excluído
            res.status(200).json({ message: `Entregador com o id ${req.params.id} foi restaurado com sucesso!` });
        } else {
            res.status(404).json({ message: `Entregador com o id ${req.params.id} não foi encontrado.` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocorreu um erro :(" });
    }
});


module.exports = router;