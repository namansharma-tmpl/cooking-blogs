const express = require('express');

const router = express.Router();

const recipes_mw = require('../middleware/recipes.mw');

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
    else {
        return res.status(200).json(ans.result);
    }
}

router.get('/suggestions', async (req, res, next) => {
    const ans = await recipes_mw.get_suggestions(req.query.perPage, req.query.categoryId);
    return_response(res, ans);
});

router.get('/:recipeId', async (req, res, next) => {
    const ans = await recipes_mw.get_recipe_details(req.params.recipeId);
    return_response(res, ans);
});

module.exports = router;

