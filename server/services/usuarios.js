const conexion = require('../conexion.js')


class usuarios {

    constructor() {
        this.users = [];
        this.getUsuarios()

        this.nombre;
        this.apellido1;
        this.apellido2;
        this.email;
        this.telefono;
        this.genero;
        this.fecha_nacimiento;
        this.edad;
        this.estado;
        this.municipio;
        this.nivel_estudios;
        this.carrera;
        this.ocupacion;
        this.nivel_ingresos;
        this.estado_civil;
        this.tiene_hijos;
        this.tiene_hijos_menores18;
        this.numero_automoviles;
        this.tiene_internet;
        this.numero_personas_hogar;
        this.numero_personas_trabajaron;
    }
    getUsuarios() {
        conexion.query('SELECT * FROM usuarios', (err, res, fields) => {
            if (err) {
                throw err;
            }
            res.forEach(element => {
                this.users.push(element)
            });
        });
    }

    findUsers() {
        return this.users;
    }


    createUser(data) {
        const newUser = { ...data };
        this.users.push(newUser)
        this.nombre = newUser.nombre;
        this.apellido1 = newUser.apellido1;
        this.apellido2 = newUser.apellido2;
        this.email = newUser.email;
        this.telefono = newUser.telefono;
        this.genero = newUser.genero;
        this.fecha_nacimiento = newUser.fecha_nacimiento
        this.edad = newUser.edad;
        this.estado = newUser.estado;
        this.municipio = newUser.municipio;
        this.nivel_estudios = newUser.nivel_estudios;
        this.carrera = newUser.carrera;
        this.ocupacion = newUser.ocupacion;
        this.nivel_ingresos = newUser.nivel_ingresos;
        this.estado_civil = newUser.estado_civil;
        this.tiene_hijos = newUser.tiene_hijos;
        this.tiene_hijos_menores18 = newUser.tiene_hijos_menores18;
        this.numero_automoviles = newUser.numero_automoviles;
        this.tiene_internet = newUser.tiene_internet;
        this.numero_personas_hogar = newUser.numero_personas_hogar;
        this.numero_personas_trabajaron = newUser.numero_personas_trabajaron;
        const query = `INSERT INTO usuarios VALUES (NULL,'
        ${this.nombre}\r\n',
        '${this.apellido1}\r\n',
        '${this.apellido2}\r\n',
        '${this.email}\r\n',
        '${this.telefono}\r\n',
        '${this.genero}\r\n',
        '${this.fecha_nacimiento}\r\n',
        '${this.edad}\r\n',
        '${this.estado}\r\n',
        '${this.municipio}\r\n',
        '${this.nivel_estudios}\r\n',
        '${this.carrera}\r\n',
        '${this.ocupacion}\r\n',
        '${this.nivel_ingresos}\r\n',
        '${this.estado_civil}\r\n',
        '${this.tiene_hijos}\r\n',
        '${this.tiene_hijos_menores18}\r\n',
        '${this.numero_automoviles}\r\n',
        '${this.tiene_internet}\r\n',
        '${this.numero_personas_hogar}\r\n',
        '${this.numero_personas_trabajaron}\r\n');`

        console.log('usuario creado')
        conexion.query(query)
        return newUser;
    }
}

module.exports = usuarios;

