import  { body, param } from 'express-validator';

export const reclamationValidationRules = () => {
    return [
        body('message')
            .isString()
            .withMessage('Message must be a string')
            .notEmpty()
            .withMessage('Message is required'),
        
        body('type')
            .isString()
            .withMessage('Type must be a string')
            .notEmpty()
            .withMessage('Type is required'),
        
        body('status')
            .isString()
            .withMessage('Status must be a string')
            .notEmpty()
            .withMessage('Status is required')
    ];
};

export const idValidationRules = () => {
    return [
        param('id')
            .isMongoId()
            .withMessage('Invalid ID format')
    ];
};

// module.exports = {
//     reclamationValidationRules,
//     idValidationRules
// };

