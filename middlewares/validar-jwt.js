
const { response,request } = require('express');
var jwt = require('jsonwebtoken');


const  validarJWT =(req=request,res=response,next)=>{

    //recibir el token por los headers
    //x-token header 
   const token= req.header('x-token');

   if(!token){
       return res.status(401).json({
           ok:false,
           msg:'No hay token en la peticion'

       });
   }

   try {
    //const payload=......
    const {uid,name,iat,exp} = jwt.verify(
        token,process.env.SECRET_JWT_SEED
    );
    //enviar datos en req;
    req.uid =uid;
    req.name=name;
    req.creado=iat;
    req.expiracion=exp;
       
   } catch (error) {

       return res.status(401).json({
           ok:false,
           msg:'token invalido'
       });
  
   }
   next();

};

module.exports={
    validarJWT
}