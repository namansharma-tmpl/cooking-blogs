const nodemailer = require('nodemailer');
const createError = require('http-errors');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}

async function contact(req, res, next){
    try {
        if (!req.body){
            next(createError(400, "Body not present"));
        }
        let name = req.body.name;
        let email = req.body.email;
        let subject = req.body.subject;
        let enquiry_type = req.body.enquiryType
        let message = req.body.message;
        if (!name || name.length === 0 || !email || !validate_email(email) || !message || message.length === 0){
            next(createError(400, "Missing or invalid details"));
        }
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_EMAIL_PASS,
            }
        });
        
        let mailOptions = {
            from: process.env.NODE_EMAIL,
            to: process.env.NODE_EMAIL,
            subject: subject,
            text: message,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
            else {
                console.log(info);
            }
        });
        res.status(200).json({"message": "your message has been registered"});
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
    }
}

module.exports = {
    contact,
}