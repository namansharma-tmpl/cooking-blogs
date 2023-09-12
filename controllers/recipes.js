const db = require('../models/index');
const createError = require('http-errors');

async function suggestions(req, res, next){
    // Endpoint: [api-endpoint]/recipes/suggestions?perPage={val}&categoryId={val}    
    try {
        let result = {};
        req.query.perPage = req.query.perPage? parseInt(req.query.perPage): 4;
        req.query.categoryId = req.query.categoryId? parseInt(req.query.categoryId): null;
        if (req.query.categoryId){
            result.recipes = await db.Recipe.findAll({
                limit: req.query.perPage,
                where: {
                    CategoryId: req.query.categoryId,
                },
                attributes: {
                    exclude: [
                        'ingredients', 'directions', 'cookingTime', 'nutritionInformation',
                        'nutritionDetails', 'shortDescription', 'AuthorId', 'CategoryId', 'updatedAt',
                    ],
                },
                include: [{
                    model: db.Author,
                    attributes: ['firstName', 'lastName']
                }, {
                    model: db.Category,
                    attributes: ['value'],
                }]
            });
            result.totalRecipesOfCategory = await db.Recipe.count({
                where: {
                    CategoryId: req.query.categoryId,
                }
            });
        }
        else {
            result.recipes = await db.Recipe.findAll({
                limit: req.query.perPage,
                order: db.sequelize.random(),
                attributes: {
                    exclude: [
                        'ingredients', 'directions', 'cookingTime', 'nutritionInformation',
                        'nutritionDetails', 'shortDescription', 'AuthorId', 'CategoryId', 'updatedAt',
                    ]
                },
                include: [{
                    model: db.Author,
                    attributes: ['firstName', 'lastName']
                }, {
                    model: db.Category,
                    attributes: ['value'],
                }],
            });
            result.totalRecipes = await db.Recipe.count({
                where: {
                    CategoryId: req.query.categoryId,
                }
            });
        }
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function singleRecipe(req, res, next){
    try {
        let result;
        result = await db.Recipe.findByPk(req.params.recipeId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'AuthorId', 'CategoryId'],
            },
            include: [{
                model: db.Author,
                attributes: ['firstName', 'lastName']
            }, {
                model: db.Category,
                attributes: ['value'],
            }],
        });
        if (result === null){
            next(createError(404, "Recipe not found"));
            return;
        }
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
    suggestions,
    singleRecipe,
}