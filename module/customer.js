const mongoose =require('mongoose');
const Joi = require('joi');

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
function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean(),
        name:Joi.string().min(3).max(21).required(),
        phone:Joi.string().min(5).max(10).required()
    }

    return Joi.validate(customer,schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;