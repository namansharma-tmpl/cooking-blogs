const db = require('../models/index');
const createError = require('http-errors');

async function categories(req, res, next){
    try {
        req.query.limit = req.query.limit? parseInt(req.query.limit): 6;
        let result = {};
        result.categories = await db.Category.findAll({
            limit: req.query.limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });
        result.totalCategories = await db.Category.count();
        console.log(result);
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