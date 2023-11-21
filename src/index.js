require('dotenv').config()
const knex = require('./conexao');
//e usado esta maneira caso o arquivo .env não esteja na raiz do projeto
//require('dotenv').config({path:'.src/.env'})
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', async (req, res) => {
    try {
        const listarUsuarios = await knex('usuarios').debug();
        console.log(listarUsuarios)
        return res.json(listarUsuarios);
    } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({ mensagem: "Erro Interno do Servidor" });
    }
});

const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log(`Servidor em pé na porta ${port}`)
})