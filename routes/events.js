
//const express = require('express');

/*
    rutas de Usuarios /events
    host + /api/events
 */
const { Router } = require('express');
const router = Router(); //eje3cutar la funcion 
//express validator
const { check } = require('express-validator');
//MIDELWARE VALIDARcAMPOS
const { validarCampos} = require('../middlewares/validar-campos');

//MIDELWARE VALIDARJWT
const { validarJWT } = require('../middlewares/validar-jwt');


// helpers isadate
const {isDate} = require('../helpers/isDate');

//contorlers
const { getEvents,createEvent,updateEvent,deleteEvent} = require('../controllers/events');


// todas las peticones pasan por validarJWT
router.use(validarJWT);

//listado de eventos
router.get('/',getEvents);

//crear eventos
router.post('/',[
    check('title','el titulo es obligatorio').not().isEmpty(),
   check('start','la fecha de inicio es obligatoria').custom(isDate),
   check('end','la fecha de fin es obligatoria').custom(isDate),
    validarCampos
],
createEvent);


//actualizar eventos
router.put('/:id',updateEvent);

//eliminar eventos
router.delete('/:id',deleteEvent);

module.exports = router;