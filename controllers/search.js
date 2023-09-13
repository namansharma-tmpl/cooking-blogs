const db = require('../models/index');
const createError = require('http-errors');
const {Op} = require('sequelize');

async function search(req, res, next){
    try {
        if (!('searchquery' in req.query) || req.query.searchquery.length === 0){
            next(createError(400, "Need some data in the search query"));
            return;
        }
        req.query.searchquery = '%' + req.query.searchquery + '%';
        let result = await db.Blog.findAll({
            where: {                
                title: {
                    [Op.iLike]: req.query.searchquery,
                },                
            },
            attributes: {
                exclude: ['updatedAt', 'content', 'AuthorId'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName', 'image'],
            }
        });
        let result2 = await db.Recipe.findAll({
            where: {
                title: {
                    [Op.iLike]: req.query.searchquery,
                }
            },
            attributes: {
                exclude: ['updatedAt', 'content', 'AuthorId', 'nutritionDetails', 'nutritionInformation',
                    'preparationTime', 'cookingTime', 'directions', 'ingredients'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName', 'image'],
            }
        });
        for (let entry of result2){
            result.push(entry);
        }        
        res.status(200).json(result);
    }
    catch (err){
        console.log(err);
        next(500, "Something went wrong");
    }
}

module.exports = {    
    search,
}