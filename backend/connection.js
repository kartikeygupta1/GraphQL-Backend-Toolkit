const mongoose = require('mongoose'); //req

const url = "mongodb+srv://kartik:kartik@cluster0.ym9aqgp.mongodb.net/graphqlbackendtoolkit?retryWrites=true&w=majority&appName=Cluster0"

//asynchromous funct - return Promise object
mongoose.connect(url)
.then((result) => {
    console.log('Database Connected Successfully');
})
.catch((err) => {
    console.log(err);
});

console.log("Another Line");