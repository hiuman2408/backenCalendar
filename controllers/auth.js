const { response } = require('express'); //par la yuda de intelisenge 

//para encryptar la contraseña

const bcrypt = require('bcryptjs');

//helpers jwstken

const {generarJWT}=require('../helpers/jwt')


//modelo usuaro
const Usuario = require('../models/Usuario');

//crearUsuario
const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({email:email});

        if(usuario){

            return res.status(400).json({
                ok:false,
                msg:`el Usuario con el email: ${email}  ya existe`
            });

        }

    
        usuario = new Usuario(req.body);

        //encryptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        //generar el token
        const token = await  generarJWT(usuario.id,usuario.name);


        res.status(201).json({
            ok: true,
            uid:usuario.id,
            name:usuario.name,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administador'

        });
        
    }


    

};


//loginUsuario
const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({email:email});

        if(!usuario){

            return res.status(400).json({
                ok:false,
                msg:`el Usuario con el email: ${email}  no  existe`
            });

        }

         //confirmar los password (devuelve un true o false)
        const validPassword = bcrypt.compareSync(password,usuario.password);

        if(!validPassword){

            return res.status(400).json({
                ok:false,
                msg:'Credencial Incorrectas-contraseña'
    
            });
        }

        //generar el toke

        const token = await  generarJWT(usuario.id,usuario.name);



        res.status(201).json({
            ok: true,
            uid:usuario.id,
            name:usuario.name,
            email:usuario.email,
            token

        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administador'

        });
        
    }
    
 

};


//renovartokenUser

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew token'
    });

};


module.exports = {
    createUser,
    loginUser,
    renewToken
};