import { body } from 'express-validator';

const loisirCategoryValidator = [
  body('libelle')
    .notEmpty()
    .withMessage('Libelle is required.')
    .isString()
    .withMessage('Libelle must be a string.'),
];

export default loisirCategoryValidator;
