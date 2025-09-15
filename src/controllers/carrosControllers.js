import dados from "../models/dados.js";

const { carros } = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
};

const getCarrosById = (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const carro = carros.find(i => i.id === id);

    if (carro) {
        res.status(200).json(carro);
    } else {
        res.status(404).json({
            erro: `Carro com ID ${id} não encontrado!`
        });
    }
}

const createCarros = (req, res) => {
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    if(!nome || !modelo || !cor ){
        return res.status(400).json({
            success: false,
            message: "Nome, modelo e cor são obrigatórios!"
        });
    }


const novoCarro = {
    id: carros.length + 1,
    nome: nome,
    modelo: modelo,
    ano: parseInt(ano),
    cor: cor,
    qtdeVitorias: parseInt(qtdeVitorias)
}

carros.push(novoCarro);

res.status(201).json({
    success: true,
    message: "Carro cadastrado com sucesso!",
    carro: novoCarro
});
}

const deleteCarro = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O ID não é válido."
        });
    }


   const carroParaRemover = carros.find(i => i.id === id);

   if(!carroParaRemover) {
    return res.status(404).json({
        success: false,
        message: `Carro com id: ${id} não existe.`
    });
}

const carrosFiltradas = carros.filter(carro => carro.id !== id);

carros.splice(0, carros.length, ...carrosFiltradas);
   
res.status(200).json({
    success: true,
    message: `O carro ${id} foi removido com sucesso!`
});
}

const updateCarro = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;
    
    const idParaEditar = id;
    
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            success: false,
            message: "o ID deve ser um numero válido"
        });
    } 
    
    const carroExiste = carros.find(carro => carro.id === idParaEditar);
    if(!carroExiste){
        return res.status(404).json({
            success: false,
            message: `O carro com o ID: ${idParaEditar} não existe.`
        });
    }
    
    const carrosAtualizados = carros.map((carro) => 
        carro.id === idParaEditar 
    ? {
        ...carro,
        ...(nome && { nome }),
        ...(modelo && { modelo }),
        ...(ano && {ano}),
        ...(cor && {cor}),
        ...(qtdeVitorias && {qtdeVitorias}),
        }
    
    : carro
);


carros.splice(0, carros.length, ...carrosAtualizados);

const carroEditado = carros.find((carro) => carro.id === idParaEditar);

res.status(200).json({
    success: true,
    message: "Dados editados com sucesso!",
    carro: carroEditado
});
}

console.log(carros)

export { getAllCarros, getCarrosById, createCarros, deleteCarro, updateCarro};