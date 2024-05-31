import { body } from 'express-validator';

const loisirValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Name must be a string.'),
  body('address')
    .notEmpty()
    .withMessage('Address is required.')
    .isString()
    .withMessage('Address must be a string.'),
  body('description')
    .notEmpty()
    .withMessage('Description is required.')
    .isString()
    .withMessage('Description must be a string.'),
  body('schedule')
    .optional()
    .isString()
    .withMessage('Schedule must be a string.'),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number.'),
  body('stars')
    .optional()
    .isString()
    .withMessage('Stars must be a string.'),
  body('pricePerNight')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price per night must be a positive number.'),
  body('kitchen')
    .optional()
    .isString()
    .withMessage('Kitchen must be a string.'),
  body('averageprice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Average price must be a positive number.'),
  body('category')
  .notEmpty()
    .custom((categories) => {
      for (let id of categories) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Category must contain valid ObjectId strings.');
        }
      }
      return true;
    }),
];

export default loisirValidator;
