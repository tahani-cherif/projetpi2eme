import { body } from 'express-validator';

const activityCategoryValidator = [
  body('libelle')
    .notEmpty()
    .withMessage('Libelle is required.')
    .isString()
    .withMessage('Libelle must be a string.'),
];

export default activityCategoryValidator;
