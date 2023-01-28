const User = require('../models/userData')
const { validationResult } = require('express-validator');
const alert = require('alert')

exports.getUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('admin/formUser', {
                pageTitle: 'User Data',
                users: users,
            })
        })
        .catch(err => {
            alert(err);
            res.redirect('/');
            console.log(err)
        })
}

exports.addUser = (req, res, next) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const user = new User({
        name: name,
        contact: contact
    });
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
        user.save()
            .then(result => {
                console.log(result);
                res.redirect('/')
            })
            .catch(err => {
                alert(err);
                res.redirect('/')
                console.log(err);
            })
    } else {
        alert(errors.array()[0].msg);
        res.redirect('/');
    }
}

exports.deleteUser = (req, res, next) => {
    const prodId = req.body.productId;
    User.findByIdAndRemove(prodId)
        .then(() => {
            alert('User deleted');
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.searchUser = (req, res, next) => {
    const name = req.body.search;
    User.find({ 'name': { '$regex': '^' + name } }).exec()
        .then((users) => {
            res.render('admin/formUser', {
                pageTitle: 'User Data',
                users: users,
            })
        })
        .catch(err => {
            alert(err);
            res.redirect('/');
            console.log(err)
        })
}