const db = require('../models/index');
const createError = require('http-errors');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}

async function subscribe(req, res, next){
    try {
        if (!req.body || !req.body.email || !validate_email(req.body.email)){
            next(createError(400, "Missing or invalid details"));
            return;
        }
        let email_exists = await db.Newsletter.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (email_exists){
            res.status(208).json({"message": "email already registered"});
            return;
        }
        let result;
        result = await db.Newsletter.create({email: req.body.email});
        delete result.dataValues.id;
        delete result.dataValues.updatedAt;
        delete result.dataValues.createdAt;
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

module.exports = {
    subscribe,
}