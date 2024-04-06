const express = require('express');
const cors = require('cors');


const userRouter = require('./router/userRouter');
// importing 

const app = express();
const port = 5000;


//middleware
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());


app.use('/user', userRouter)
 

app.listen(port, () => {
    console.log('Server Started');
})