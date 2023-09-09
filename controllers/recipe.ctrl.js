const db = require('../models/index');

async function get_categories(limit){
    return await db.Category.findAll({
        limit,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }
    });
}

async function get_category_by_id(id){
    return await db.Category.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updateAt'],
        }
    })
}

async function get_recipes_by_category(perPage, categoryId){
    return await db.Recipe.findAll({
        limit: perPage,
        CategoryId: categoryId,
        attributes: {
            exclude: [
                'ingredients', 'directions', 'cookingTime', 'nutritionInformation',
                'nutritionDetails', 'shortDescription'
            ]
        }
    });
}

async function get_recipes(perPage){
    return await db.Recipe.findAll({
        limit: perPage,
        order: db.sequelize.random(),
        attributes: {
            exclude: [
                'ingredients', 'directions', 'cookingTime', 'nutritionInformation',
                'nutritionDetails', 'shortDescription'
            ]
        }
    });
}

async function get_recipe_details(id){
    return await db.Recipe.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }
    });
}

module.exports = {
    get_category_by_id,
    get_recipes,
    get_recipes_by_category,
    get_categories,
    get_recipe_details,
}