const recipe_ctrl = require('../controllers/recipe.ctrl');
const author_ctrl = require('../controllers/author.ctrl');

async function get_suggestions(perPage, categoryId){
    // Endpoint: [api-endpoint]/recipes/suggestions?perPage={val}&categoryId={val}
    let result;
    perPage = perPage? parseInt(perPage): 4;
    categoryId = categoryId? parseInt(categoryId): null;
    try {
        if (categoryId){            
            result = await recipe_ctrl.get_recipes_by_category(perPage, categoryId);
            let category = await recipe_ctrl.get_category_by_id(categoryId);
            for (let recipe of result){
                let author = await author_ctrl.get_author_details(recipe.dataValues.AuthorId);
                recipe.dataValues.authorFirstName = author.firstName;
                recipe.dataValues.authorLastName = author.lastName;                
                recipe.dataValues.category = category.value;
                delete recipe.dataValues.CategoryId;
                delete recipe.dataValues.AuthorId;
            }
        }
        else {
            result = await recipe_ctrl.get_recipes(perPage);
            for (let recipe of result){
                let category = await recipe_ctrl.get_category_by_id(recipe.CategoryId);
                let author = await author_ctrl.get_author_details(recipe.dataValues.AuthorId);
                recipe.dataValues.authorFirstName = author.firstName;
                recipe.dataValues.authorLastName = author.lastName;                
                recipe.dataValues.category = category.value;
                delete recipe.dataValues.CategoryId;
                delete recipe.dataValues.AuthorId;
            }
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

async function get_recipe_details(recipeId){
    let result;
    try {
        result = await recipe_ctrl.get_recipe_details(recipeId);
        let category = await recipe_ctrl.get_category_by_id(result.CategoryId);
        let author = await author_ctrl.get_author_details(result.dataValues.AuthorId);
        result.dataValues.authorFirstName = author.firstName;
        result.dataValues.authorLastName = author.lastName;
        result.dataValues.authorImage = author.image;
        result.dataValues.category = category.value;
        delete result.dataValues.CategoryId;
        delete result.dataValues.AuthorId;
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    get_recipe_details,
    get_suggestions,
}