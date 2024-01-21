const mongoose =require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:21
    },
    phone:{
        type:String,
        minlength:5,
        maxlength:10
    }
});

const Customer = new mongoose.model('Customer',customerSchema);

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

function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean(),
        name:Joi.string().min(3).max(21).required(),
        phone:Joi.string().min(5).max(10).required()
    }

    return Joi.validate(customer,schema);
}

module.exports= router;