const Joi =require('joi');
const mongoose = require('mongoose');
//const express = require('express');
const { moviesSchema } = require('./movies');
const { customerSchema } = require('./customer');

const rentalSchema = new mongoose.Schema({
movie : moviesSchema,
customer: customerSchema,
date:{
    type:Date,
    default: Date.now,
    required:true
},
expDate:{
    type:Date,
},
rentalFee:{
    type:Number,
    min:0
}

});

const Rental = new mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema ={
        customerId:Joi.string().required(),
        movieId: Joi.string().requires()
    };

    return Joi.validate(rental,schema)
   
}
module.exports.validateRental =validateRental;
module.exports.rentalSchema=rentalSchema;
module.exports.Rental =Rental;