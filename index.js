const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses =[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
];
app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.get('/api/get',(req,res)=>{
    res.send(courses);
});
app.post('/api/get',(req,res)=>{
    const schema ={
        name: Joi.string().min(3).required()

    };
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});





app.get('/api/get/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Not found')
    res.send(course);
});
app.get('/api/post/:year/:month',(req,res)=>{
    res.send(req.params);
});
const port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`Listening at port ${port}....`));