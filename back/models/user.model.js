const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    password:{
        type: String,
        trim: true,
        minlength: 3
    },
    sni:{
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    admin:{
        type: Boolean,
        required: true,
        },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'UserAnswer'
    }],
}, {
    timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);