const newsletter_ctrl = require('../controllers/newsletter.ctrl');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}

async function subscribe_to_newsletter(email){
    console.log('here1');
    if (!email || !validate_email(email)){
        return {status: 400};
    }
    console.log('here');
    let email_exists = await newsletter_ctrl.email_exists(email);
    if (email_exists){
        return {status: 208};
    }
    let result;
    try {
        result = await newsletter_ctrl.register_email(email);
        delete result.dataValues.id;
        delete result.dataValues.updatedAt;
        delete result.dataValues.createdAt;
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    subscribe_to_newsletter,
}