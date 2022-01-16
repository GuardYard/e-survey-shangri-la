const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        minlength: 10,
        maxlength: 1000,
    },
    answerOptions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer",
        }
    ],
    questionSetId: {
        type: Schema.Types.ObjectId,
        ref: "QuestionSet",
    }
}, {
    timestamps: true
});

module.exports = Question = mongoose.model('Question', QuestionSchema);
