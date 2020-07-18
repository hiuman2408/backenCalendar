
const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {
        await  mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true,
             useUnifiedTopology: true,
            useCreateIndex:true})
        console.log('Base de datos onlline');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error a l ahora de iniciar la BD')
        
    }

};


module.exports = {dbConnection};


//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});