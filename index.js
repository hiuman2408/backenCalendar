const express = require('express');


require('dotenv').config();///para las varibles de entorno

const { dbConnection } = require('./database/config');
//console.log(process.env);

//crear servidor expres
const app = express();

//base de datos mongodb atlas
dbConnection();

//directorio publico

app.use(express.static('public'));

//lectura y parseo del body

app.use(express.json());



//rutas

//auth //crear , login renew token

app.use('/api/auth', require('./routes/auth'));



//crud: eventos

//crud de hospitales


//crud de medicos




//escucharpeticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});