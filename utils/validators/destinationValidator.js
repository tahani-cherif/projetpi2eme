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
  body('loisir')
    .optional()
    .isArray()
    .withMessage('Loisir must be an array.')
    .custom((loisir) => {
      for (let id of loisir) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Loisir must contain valid ObjectId strings.');
        }
      }
      return true;
    }),
];

export default destinationValidator;
