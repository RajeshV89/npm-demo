const express = require('express');
const {Rental,validateRental} = require('../module/rentals');
const {Customer} = require('../module/customer');
const {Movie} = require('../module/movies');
const routes = express.Router();

routes.get('/',async (req,res)=>{
    const rentalDetail = await Rental.find();
    res.send(rentalDetail);
});

routes.post('/',async (req,res)=>{
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer..');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie..');

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie :{
            _id : movie._id,
            titile : movie.titile,
            genre : {
                _id:movie.genre._id,
                name:movie.genre.name
            },
            dailyRentalRate :movie.dailyRentalRate,
            numberInStock : movie.numberInStock
        }
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();

    res.send(rental);






});

module.exports =routes;