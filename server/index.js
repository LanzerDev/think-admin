//importaciones
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
const usuarios = require('./services/usuarios.js')
const bodyParser = require('body-parser')
const cors = require('cors')
//servicios
const _usuariosService = new usuarios();

//dependecias
app.set('json spaces', 2)
app.use(bodyParser.json());
//variables

app.use(cors())





app.get('/', (req, res)=>{
    res.send('think-mercadocenia api')
})

app.get('/api/usuarios/', (req, res)=>{
    const users = _usuariosService.findUsers()
    res.json(users)
})

app.post('/api/newUser/', (req, res)=>{
    const body = req.body;
    const newUser = _usuariosService.createUser(body);
    res.status(201).json({
        "message":"usuario creado"
    })
})
 

app.listen(port, ()=>{
    console.log('port' + port)
})
