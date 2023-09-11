const db = require('../models/index');
const createError = require('http-errors');

async function categories(req, res, next){
    try {
        req.query.limit = req.query.limit? parseInt(req.query.limit): 6;
        let result;
        result = await db.Category.findAll({
            limit: req.query.limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });
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
    categories,
}