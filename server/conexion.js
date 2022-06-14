const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'think_bdd',
    user: 'root',
    password: '1234'
});

conexion.connect((error)=>{
    if(error){
        throw error;
    } else {
        console.log('conexion exitosa c:')
    }
});


module.exports = conexion;

//conexion.end();