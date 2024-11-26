import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js';

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 

// Exportando a Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes-byvlml' da conexão
    const db = conexao.db("instabytes-byvlml");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("instabytes-byvlml");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instabytes-byvlml");
    const colecao = db.collection("posts");
    const objetoID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objetoID)}, {$set:novoPost})
}