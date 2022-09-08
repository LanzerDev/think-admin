const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'somosthink.com',
    database: 'somosthi_formularios',
    user: 'somosthink',
    password: 'SithhMastahh189!'
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