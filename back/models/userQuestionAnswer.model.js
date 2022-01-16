const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    questionAnswer: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);;