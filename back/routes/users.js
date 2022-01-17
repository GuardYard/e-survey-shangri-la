const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// @route GET all users --> /users/
router.get('/', (req, res) => {
    User.find().populate('answers')
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route GET user by Id --> /users/:id
router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('answers')
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ Error: err, nousersfound: 'No Users found' }));
});

// @route PUT update an user --> /users/
router.put('/', (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body)
        .then(user => res.json({ msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ Error: err, error: 'Unable to update the Database' }));
});

// @route DELETE a user --> /users/:id
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ Error: err, error: 'No such a user' }));
});

module.exports = router;