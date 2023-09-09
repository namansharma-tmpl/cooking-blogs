const express = require('express');

const router = express.Router();

const newsletter_mw = require('../middleware/newsletter.mw');

function return_response(res, ans){
    if (ans.status === 404){
        return res.status(404).json({"error": "page not found"});
    }
    else if (ans.status === 400){
        return res.status(400).json({"error": "missing or invalid details"});
    }
    else if (ans.status === 500){
        return res.status(500).json({"error": "something went wrong"});
    }
    else if (ans.status === 208){
        return res.status(208).json({"message": "this email already exists"});
    }
    else {
        return res.status(200).json();
    }
}

router.post('/', async (req, res, next) => {    
    const ans = await newsletter_mw.subscribe_to_newsletter(req.body.email);
    return_response(res, ans);
});

module.exports = router;