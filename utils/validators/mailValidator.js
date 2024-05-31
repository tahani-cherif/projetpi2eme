import  { body, param } from 'express-validator';




export const mailValidationRules = () => {
    return [        
        body('email')
            .isString()
            .withMessage('email must be a string')
            .notEmpty()
            .withMessage('email is required'),
        body('subject')
            .isString()
            .withMessage('subject must be a string')
            .notEmpty()
            .withMessage('subject is required'),
        body('object')
            .isString()
            .withMessage('object must be a string')
            .notEmpty()
            .withMessage('object is required'),
        body('sujet')
            .isString()
            .withMessage('sujet must be a string')
            .notEmpty()
            .withMessage('sujet is required'),

    ];
};