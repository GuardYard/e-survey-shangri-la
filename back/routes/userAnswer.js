const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const UserAnswer = require('../models/userQuestionAnswer.model');

router.post('/', (req, res) => {
    UserAnswer.create(req.body)
        .then(userAnswer => User.findByIdAndUpdate(userAnswer.owner, { $push: { answers: userAnswer.id }}))
        .then(_user => res.json({ msg: 'User answer added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this user answer' }));
});

router.delete('/:id', (req, res) => {
    UserAnswer.findByIdAndDelete(req.params.id)
        .then(userAnswer => User.findByIdAndUpdate(userAnswer.owner, { $pull: { answers: userAnswer.id }}))
        .then(userAnswer => res.json({ mgs: 'Answer entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a answer' }));
});

module.exports = router;