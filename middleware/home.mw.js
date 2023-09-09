const recipe_ctrl = require('../controllers/recipe.ctrl');

async function get_categories(limit){
    limit = limit? parseInt(limit): null;
    let result;
    try {
        result = await recipe_ctrl.get_categories(limit);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }    
    return {status: 200, result};
}

module.exports = {    
    get_categories,
}