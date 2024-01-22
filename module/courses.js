const Joi =require('joi');
const mongoose = require('mongoose');
const express = require('express');
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:5,
        maxLength:50
    }
});
const Genre = new mongoose.model('Genre',genreSchema);

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
module.exports.genreSchema = genreSchema;