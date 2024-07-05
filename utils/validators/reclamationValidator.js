import  { body, param } from 'express-validator';

export const reclamationValidationRules = () => {
    return [
        body('message')
            .isString()
            .withMessage('Message must be a string')
            .notEmpty()
            .withMessage('Message is required'),
        
    ];
};

export const idValidationRules = () => {
    return [
        param('_id')
            .isMongoId()
            .withMessage('Invalid ID format')
    ];
};

// module.exports = {
//     reclamationValidationRules,
//     idValidationRules
// };

