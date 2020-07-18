//const express = require('express');

/*
    rutas de Usuarios /auth
    host + /api/auth
 */
const { Router } = require('express');

//express validator
const { check } = require('express-validator');

const router = Router(); //eje3cutar la funcion 

const { createUser, loginUser, renewToken } = require('../controllers/auth'); //destructurin metodos
const {
    validarCampos
} = require('../middlewares/validar-campos');


//crear usuarios
router.post(
    '/new', [ //midelware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser  6 caracteres como minimo').isLength({
            min: 6
        }), validarCampos
    ],
    createUser);

//para el login de user
router.post(
    '/',

    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser  6 caracteres como minimo').isLength({
            min: 6
        }), validarCampos

    ],
    loginUser);

//para renovar el token

router.get('/renew', renewToken);

module.exports = router;