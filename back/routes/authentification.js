const express = require('express');
const router = express.Router();
const passwordServices = require('../services/passwordServices')

const User = require('../models/user.model');
const Question = require('../models/question.model');


// @route POST Create an User --> /users/register
router.post('/register', (req, res) => {
    let data = req.body;
    data.password = passwordServices.hash(data.password);
    User.create(data)
        .then(user => res.json({ msg: 'User added successfully' }))
        .catch(err => res.status(400).json({ Error: err, error: 'Unable to add this user' }));
});

// @route POST Login --> /users/login
router.post('/login', (req, res) => {
    passwordServices.authenticate(req.body)
        .then(user => {
            res.status(202).json({ id: user.id, msg: "User successfully logged in" })
        })
        .catch(err => res.status(202).json({ Error: err, msg: "Incorrect" }))
})

router.get('/GetQuestionResponse/:id', (req, res) => {
    let response = {Question: req.params.id, Answers:[]};
    User.find().populate('answers').then(users => {
        Question.find().populate('answerOptions').then(question => {
            question[req.params.id-1].answerOptions.map(questionAnswer => {
                response.Answers.push({id:questionAnswer.optionNumber.toString(), count:0})
            })
            users.map(user => {
                user.answers.map(answer => {
                    response.Answers.map(QuestionAnswer => {
                        if(answer.questionId.valueOf() === question[req.params.id-1].id){
                            if(answer.questionAnswer.toString() === QuestionAnswer.id){
                                QuestionAnswer.count += 1;
                            }
                        }
                    })
                })
            })
            res.json(response)
        })
    })
});

router.get('/GetAllQuestions/', (req, res) => {
    let resQuestions = {Question: []};
    let id = 1;
        Quecdstion.find().then(questions => {
            questions.map(question => {
                resQuestions.Question.push({id:id.toString(), Text:question.question})
                id+=1;
            })
            let response = {consulations: resQuestions};
            res.json(response)
        })
});

router.get('/GetQuestionOptions/:id', (req, res) => {
    let response = {Question: req.params.id, Options:[]};
        Question.find().populate('answerOptions').then(questions => {
            questions[req.params.id-1].answerOptions.map(answer => {
                response.Options.push({id:answer.optionNumber.toString(), Text:answer.answerBody})
            })
            res.json(response)
        })
});

module.exports = router;