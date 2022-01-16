const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSetSchema = new Schema({
    questionSet: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
}, {
    timestamps: true
});

module.exports = QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);
