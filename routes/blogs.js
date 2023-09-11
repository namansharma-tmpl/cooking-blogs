const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blogs');

router.get('/', blogController.blogs);
router.get('/:blogId', blogController.singleBlog);

module.exports = router;