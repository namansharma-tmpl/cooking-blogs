const express = require('express');

const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.recipes);

router.get('/suggestions', recipesController.suggestions);

router.get('/:recipeId', recipesController.singleRecipe);

module.exports = router;

