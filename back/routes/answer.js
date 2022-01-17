const express = require('express');
const router = express.Router();

const Question = require('../models/question.model');
const Answer = require('../models/answer.model');

router.post('/', (req, res) => {
    Answer.create(req.body)
        .then(answer => Question.findByIdAndUpdate(answer.questionId, { $push: { answerOptions: answer.id }}))
        .then(_user => res.json({ msg: 'Answer added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this answer' }));
});

router.put('/titleUpdate', (req, res) => {
    let newTitle = req.body.newTitle
    Answer.findByIdAndUpdate(req.body.id, { $set: { answerBody: newTitle }})
        .then(question => res.json({ msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({ error: 'Unable to update the question' }));
});

router.delete('/:id', (req, res) => {
    Answer.findByIdAndDelete(req.params.id)
        .then(answer => Question.findByIdAndUpdate(answer.questionId, { $pull: { answerOptions: answer.id }}))
        .then(answer => res.json({ mgs: 'Answer entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a answer' }));
});

module.exports = router;