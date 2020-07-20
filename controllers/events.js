
const { response } = require('express'); //par la yuda de intelisenge 

 const Evento = require('../models/Evento');

const getEvents = async (req, res = response) => {

    
    try {
        const eventos = await Evento.find()
                                    .populate('user','name email');

    res.json({
        ok: true,
        eventos
    });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: true,
            msg:'hable con el administrador'
            
        });  
    }
};

const createEvent = async (req,res=respose)=>{

   
    const evento = new Evento(req.body);
          

    try {

        evento.user= req.uid; //viene de verificar el token
        

     const eventoGuardado=   await evento.save();

        res.status(201).json({
            ok: true,
            msg:'evento creado',
            eventoGuardado
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: true,
            msg:'hable con el administrador'
            
        });
    
        
    }

   

};

const updateEvent = async(req,res=response)=>{

    const idEvento= req.params.id; //id que s emanda por parametro a actulizar
    const uid = req.uid ;          //id del usuarii para validar si puede actualzar


    try {

        const eventoDB =  await Evento.findById(idEvento);


        if(!eventoDB){
            return res.status(404).json({

                ok:false,
                msg:`el evento con este Id no existe`
            });
        }


        if(eventoDB.user.toString()!==uid){  //para compara el uid de base de datos y el uid del validar tokenJWT
          return res.status(401).json({
              ok:false,
              msg:'No tiene privilegios para editar este evento'

          });
        }

        const nuevoEvento ={
            ...req.body, //desestructuraar todo el body
            user:uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(idEvento, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: true,
            msg:'hable con el administrador'
            
        });

 
    }
    
};

const deleteEvent = async (req,res=response)=>{

    const idEvento= req.params.id; //id que s emanda por parametro a actulizar
    const uid = req.uid ;          //id del usuarii para validar si puede actualzar


    try {

        const eventoDB =  await Evento.findById(idEvento);

        if(!eventoDB){
            return res.status(404).json({

                ok:false,
                msg:`el evento con este Id no existe`
            });
        }


        if(eventoDB.user.toString()!==uid){  //para compara el uid de base de datos y el uid del validar tokenJWT
          return res.status(401).json({
              ok:false,
              msg:'No tiene privilegios para Eliminar  este evento'

          });
        }


        await Evento.findByIdAndDelete( idEvento );


        res.json({
            ok: true,
            msg:'evento eliminado'
        });
 
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: true,
            msg:'hable con el administrador'
            
        });
        
    }


};

module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};