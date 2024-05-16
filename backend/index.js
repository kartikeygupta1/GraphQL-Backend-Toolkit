const express = require('express');
const cors = require('cors');

const feedbackRouter = require('./router/feedbackRouter');
const userRouter = require('./router/userRouter');
const projectRouter = require('./router/projectRouter');
// importing 

const app = express();
const port = 5000;


//middleware
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());

app.use('/feedback', feedbackRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)
 

app.listen(port, () => {
    console.log('Server Started');
})