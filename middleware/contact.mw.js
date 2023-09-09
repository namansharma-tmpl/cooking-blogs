const nodemailer = require('nodemailer');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}

async function contact_us(body){
    let name = body.name;
    let email = body.email;
    let subject = body.subject;
    let enquiry_type = body.enquiryType
    let message = body.message;
    if (!name || name.length === 0 || !email || !validate_email(email) || !message || message.length === 0){
        return {status: 400};
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
            return {status: 500};
        }
        else {
            console.log(info);
        }
    });
    return {status: 200, result: "Your message has been registered"};
}

module.exports = {
    contact_us,
}