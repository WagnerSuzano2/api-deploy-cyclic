require('dotenv').config()
const knex = require('./conexao');
//e usado esta maneira caso o arquivo .env não esteja na raiz do projeto
//require('dotenv').config({path:'.src/.env'})
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const listarUsuarios = await knex('usuarios');
        return res.json(listarUsuarios);
    } catch (error) {
        console.error('erro ao listar usuarios:', error);
        return res.status(500).json({ mensagem: "Erro Interno do Servidor" });
    }
});

app.post('/cadastrarUsuario', async (req, res) => {
    try {
        const { nome, email, data_nascimento } = req.body;
        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            data_nascimento,
        }).returning('*');
        return res.status(201).json({ usuario: novoUsuario[0] });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ mensagem: "Erro Interno do Servidor" });
    }
});

app.put('/atualizarUsuario/:id', async (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;
    try {
        const usuarioAtualizado = await knex('usuarios').update({ nome, email }).where({ id }).returning('*');
        console.log(usuarioAtualizado);
        return res.json(usuarioAtualizado)

    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return res.status(500).json({ mensagem: "Erro Interno do Servidor" });
    }
});
app.delete('/exluirUsuario/:id', async (req, res) => {
    const { id } = req.params
    try {
        const usuarioExcluido = await knex('usuarios').del().where({ id }).returning('*');
        return res.json(usuarioExcluido);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ mensagem: "Erro Interno do Servidor" });
    }
})

const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log(`Servidor em pé na porta ${port}`)
})