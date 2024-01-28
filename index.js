const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const movies = require('./routes/movies');
const hello = require('./routes/hello');
const customer = require('./routes/customer');
const rental = require('./routes/rental');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
mongoose.connect('mongodb://localhost/learning-sec-nine')
       .then(()=>console.log('Connted to MongoDB learning-sec-nine..'))
       .catch(err=>console.log("Not Connected",err))
app.use(express.json());
app.use(logger)
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/api/customer',customer);
app.use('/api/movies',movies);
app.use('/api/rental',rental);
app.use('/',hello);
app.use(morgan('tiny'));

app.get('/api/post/:year/:month',(req,res)=>{
    res.send(req.params);
});
const port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`Listening at port ${port}....`));