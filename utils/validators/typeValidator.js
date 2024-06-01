import  { body, param } from 'express-validator';


export const typeValidationRules = () => {
    return [        
        body('libelles')
            .isString()
            .withMessage('Libelles must be a string')
            .notEmpty()
            .withMessage('Libelles is required')
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
//     typeValidationRules,
//     idValidationRules
// };
