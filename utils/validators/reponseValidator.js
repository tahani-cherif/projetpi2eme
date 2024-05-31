
import  { body, param } from 'express-validator';

const reponseValidationRules = () => {
    return [
        body('message')
            .isString()
            .withMessage('Message must be a string')
            .notEmpty()
            .withMessage('Message is required'),
        
        
        body('status')
            .isString()
            .withMessage('Status must be a string')
            .notEmpty()
            .withMessage('Status is required')
    ];
};

const idValidationRules = () => {
    return [
        param('id')
            .isMongoId()
            .withMessage('Invalid ID format')
    ];
};

// module.exports = {
//     reponseValidationRules,
//     idValidationRules
// };
