require('dotenv').config()
//e usado esta maneira caso o arquivo .env não esteja na raiz do projeto
//require('dotenv').config({path:'.src/.env'})
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', async (req, res) => {
    return res.json('Api está Ok! Wagner'`${process.env.DB_URI}`)
})
const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log(`Servidor em pé na porta ${port}`)
})