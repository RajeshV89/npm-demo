const express = require('express');
const mongoose = require('mongoose')
const {Movie,validateMovie} = require('../module/movies');
const {Genre} = require('../module/courses');

const router = express.Router();
// mongoose.connect('mongodb://localhost/learning-sec-nine')
//         .then(()=>'Connection Successfull with MongoDB')
//         .catch(err=>console.log('Not connected..',err));

router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/',async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');
    let movie = new Movie({ 
        titile: req.body.titile,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      });
      movie = await movie.save();
      
      res.send(movie);

})

module.exports=router;