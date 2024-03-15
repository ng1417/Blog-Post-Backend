//import necessary modules or dependencies
const express = require('express');
const mongoose = require('mongoose');
const { post } = require('./src/routes/post');
require('dotenv').config();

//Make an instance of Express Application
const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log('Request body:');
        console.log(req.body);
    }
    next();
})





//Routes
app.use('/api/posts', require('./src/routes/post'))
app.use("/api/users", require('./src/routes/user'))

//connect to MongoDb or database
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlparser: true, useUnifiedTopology:true })
    .then(()=>{
        console.log('Connected to MongoDB');

    }).catch(() => {
        console.log('Error connecting to MongoDB:', error.message);

    });

//start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});