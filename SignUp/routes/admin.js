const express = require('express');

const adminController = require('../controller/admin');
const { body } = require('express-validator')
const User = require('../models/userData');
const router = express.Router();

router.get('/', adminController.getForm);
router.post('/add-user', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-Mail address already exists!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min: 5 }),
    body('name')
    .trim()
    .not()
    .isEmpty()
], adminController.addUser);


module.exports = router;