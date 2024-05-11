const mongoose = require('mongoose'); //req

const url = "mongodb+srv://user:ayush@cluster0.2ue1csn.mongodb.net/testproduct?retryWrites=true&w=majority&appName=Cluster0"

//asynchromous funct - return Promise object
mongoose.connect(url)
.then((result) => {
    console.log('Database Connected Successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;

