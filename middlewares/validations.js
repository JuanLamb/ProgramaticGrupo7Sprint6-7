const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('firstName')
        .notEmpty().withMessage('Debes completar tu nombre').bail()
        .isLength({ min: 3 }),
    body('lastName')
        .notEmpty().withMessage('Debes completar tu apellido').bail()
        .isLength({ min: 3 }),
    body('username')
        .notEmpty().withMessage('Debes completar tu nombre de usuario'),
    body('email')
        .notEmpty().withMessage('Debes completar tu e-mail').bail()
        .isEmail().withMessage('Debes escribir un correo valido'),
    body('birthday')
        .notEmpty().withMessage('Debes completar tu fecha de nacimiento'),
    body('street')
        .notEmpty().withMessage('Debes completar tu domicilio'),
    body('number')
        .notEmpty().withMessage('Debes completar tu domicilio'),
    body('password')
        .notEmpty().withMessage('Debes completar tu contraseña').bail()
        .isLength({ min: 6 }),
    body('passwordConfirm')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if(value != req.body.password){
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    body('avatar')
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];


        if(!file){
            throw new Error('Debes cargar una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validations;