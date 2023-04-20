const Entregadores = require("../database/entregadores");
const Pedidos = require("../database/pedidos");

const { Router } = require("express");

const router = Router();

//Pesquisa todos entregadores
router.get("/entregadores", async (req, res) => {
    const listasEntregador = await Entregadores.findAll();
    
    res.status(200).json(listasEntregador);
});

//Pesquisa todos entregadores excluidos
router.get("/entregadores/excluidos", async (req, res) => {
    const listasEntregador = await Entregadores.findAll({ paranoid:false });
    
    res.status(200).json(listasEntregador);
});


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

//Restaurar o pedido deletado(Paranoid)
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