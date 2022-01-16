const express = require('express');
const router = express.Router();

const QuestionSet = require('../models/questionSet.model');

router.get('/', (req, res) => {
    QuestionSet.find().populate('questionSet')
        .then(questionSet => res.json(questionSet))
        .catch(err => res.status(404).json({ Error: err }));
});

router.get('/id', (req, res) => {
    QuestionSet.find()
        .then(questionSet => res.json(questionSet[0].id))
        .catch(err => res.status(404).json({ Error: err }));
});

router.post('/init', (req, res) => {
    let data = req.body;
    console.log(data);
    QuestionSet.create(data)
        .then(user => res.json({ msg: 'QuestSet added successfully' }))
        .catch(err => res.status(400).json({ Error: err, error: 'Unable to add this user' }));
});


module.exports = router;