const Joi =require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('../module/courses');

const moviesSchema = new mongoose.Schema({
    titile:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }

});

const Movie = new mongoose.model('Movie',moviesSchema);
function validateMovie(genre) {
    const schema = {
      titile: Joi.string().min(3).required(),
      genreId:Joi.string().required(),
      numberInStock:Joi.number().min(0).required(),
      dailyRentalRate:Joi.number().min(0).required()
    };
  
    return Joi.validate(genre, schema);
  }

module.exports.Movie=Movie;
module.exports.validateMovie=validateMovie;