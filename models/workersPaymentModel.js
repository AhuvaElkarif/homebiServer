const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const workersPayments = new mongoose.Schema({
    type_expense_id:String,
    description:String,
    is_pay:Boolean,
    date_created: {
        type: Date, default: Date.now()
    }
});

exports.UserModel = mongoose.model("complaints", complaintSchema);

exports.userValid = (_reqBody) => {
    let joiSchema = Joi.object({
        city: Joi.string().min(2).max(50).required(),
        street: Joi.string().min(2).max(50).required(),
        numHouse: Joi.string().min(2).max(100).email().required(),
        numEntry: Joi.string().min(6).max(50).required(),
        numApartment: Joi.number().required(),
        phone: Joi.string().min(9).max(10).required(),
        paymentType: Joi.boolean().min(9).max(10).required(),
    });
    return joiSchema.validate(_reqBody);
}

exports.genToken = (_userId) => {
    let token = jwt.sign({ _id: _userId }, "secret", { expiresIn: "60min" });
    return token;
}

