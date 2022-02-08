const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const testRouter = require('./routes/test.router');
const questionRouter = require('./routes/question.router');
const messageRouter = require('./routes/message.router');
const eventRouter = require('./routes/event.router'); 
const examRouter = require('./routes/exam.router');
const allUsersRouter = require('./routes/allusers.router');
const imageRouter = require('./routes/image.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/test', testRouter);
app.use('/api/question', questionRouter);
app.use('/api/message', messageRouter);
app.use('/api/event', eventRouter);
app.use('/api/exam', examRouter);
app.use('/api/allusers', allUsersRouter)
app.use('/api/image', imageRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;
const DB_PORT = process.env.DB_PORT || 5432

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} using db port: ${DB_PORT}`);
});
