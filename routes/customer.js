const mongoose =require('mongoose');
const express = require('express');
const {Customer,validateCustomer} = require('../module/customer');

const router = express.Router();

router.get('/',async (req,res)=>{
    const customer = await Customer.find();
    res.send(customer);
});

router.post('/',async (req,res)=>{
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    

    let customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone});

    customer= await customer.save();

    res.send(customer);

})
module.exports= router;