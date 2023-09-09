const db = require('../models/index');

async function email_exists(email){
    let result = await db.Newsletter.findOne({
        where: {
            email,
        }
    });
    result = result? true: false;
    return result;
}

async function register_email(email){
    let result = await db.Newsletter.create({email});
    return result;
}

module.exports = {
    register_email,
    email_exists,
}