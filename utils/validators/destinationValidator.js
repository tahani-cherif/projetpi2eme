import { body } from 'express-validator';

const destinationValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Name must be a string.'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),
  body('localisation')
    .optional()
    .isString()
    .withMessage('Localisation must be a string.'),
  body('imageUrl')
  .notEmpty()
  .withMessage('Image is required.')
   

];

export default destinationValidator;
