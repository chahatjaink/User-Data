const express = require('express');

const adminController = require('../controller/admin');
const { body } = require('express-validator')

const router = express.Router();

router.get('/', adminController.getUser);
router.post('/add-user', [
    body('contact')
    .isNumeric()
    .isLength({ min: 10, max: 10 })
], adminController.addUser);
router.post('/delete-user', adminController.deleteUser);

router.post('/search', adminController.searchUser);

module.exports = router;