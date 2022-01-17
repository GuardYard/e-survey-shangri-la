const express = require('express');
const router = express.Router();

const QuestionSet = require('../models/questionSet.model');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const User = require('../models/user.model')

router.get('/', (req, res) => {
    Question.find().populate('answerOptions')
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ noquestionfound: 'No question found' }));
});

router.get('/:id', (req, res) => {
    Question.findById(req.params.id).populate('answerOptions')
        .then(question => res.json(question))
        .catch(err => res.status(404).json({ noquestionfound: 'No question found' }));
});

router.put('/titleUpdate', (req, res) => {
    let newTitle = req.body.newTitle
    Question.findByIdAndUpdate(req.body.id, { $set: { question: newTitle }})
        .then(question => res.json({ msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({ error: 'Unable to update the question' }));
});

router.post('/', (req, res) => {
    let questionId;
    Question.create(req.body)
        .then(question => {
            QuestionSet.findByIdAndUpdate(question.questionSetId, {$push: {questionSet: question.id}});
            questionId = question.id;
        })
        .then(question => res.json({ questionId: questionId, msg: 'Question added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this question' }));
});

router.delete('/:id', (req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(question => {
            QuestionSet.findByIdAndUpdate(question.questionSetId, {$pull: {questionSet: question.id}});
            question.answerOptions.map(answer => Answer.findByIdAndDelete(answer));
        })
        .then(question => res.json({ mgs: 'Question entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a question' }));
});

module.exports = router;