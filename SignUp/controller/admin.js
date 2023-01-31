const User = require('../models/userData')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


exports.getForm = (req, res, next) => {
    res.render('admin/formUser', {
        pageTitle: 'Signup Form'
    });
}

exports.addUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    bcrypt.hash(password, 12)
        .then(hashedPwd => {

            const user = new User({
                name: name,
                email: email,
                username: username,
                password: hashedPwd
            });
            return user.save();
        })
        .then(result => {
            console.log(result);
            res.redirect('/')
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}