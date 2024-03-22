const express = require('express');

const postRouter = require('./router/postRouter'); // importing 

const app = express();
const port = 5000;

//middleware
app.use('/post' , postRouter);

app.get('/', (req, res) => {
    res.send('Response From Express')
});

app.get('/add', (req, res) => {
    res.send('Add Response From Express')
});

app.listen(port, () => {
    console.log('Server Started');
})