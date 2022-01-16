const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port =  process.env.PORT || 8082;

//Connexion to Database (URL in .env)
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri)
    .catch(err => {
        console.log("Authentification to mongoose failed")
        console.log(err.message)
    });

mongoose.connection.once('open', () => { console.log("MongoDB database connection established successfully") });

app.use(cors());
app.use(express.json());

//routes
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/authentification')
const questionsRoutes = require('./routes/questionSet')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const UserAnswerRoutes = require('./routes/userAnswer')

//
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/questions', questionsRoutes);
app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/respond', UserAnswerRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
