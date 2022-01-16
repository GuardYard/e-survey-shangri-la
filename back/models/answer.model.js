const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerOptionSchema = new Schema({
    optionNumber: {
        type: Number,
        required: true
    },
    answerBody: {
        type: String,
        minlength: 1,
        maxlength: 200,
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
    }
}, {
    timestamps: true
});

module.exports = Answer = mongoose.model('Answer', AnswerOptionSchema);
