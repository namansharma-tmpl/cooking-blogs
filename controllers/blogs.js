const db = require('../models/index');
const createError = require('http-errors');

async function blogs(req, res, next){
    try {
        req.query.pageNo = parseInt(req.query.pageNo);
        req.query.pageNo = !req.query.pageNo? 1: req.query.pageNo;
        let result = {};
        result.blogs = await db.Blog.findAll({
            limit: 6,
            offset: (req.query.pageNo - 1) * 6,
            attributes: {
                exclude: ['updatedAt', 'content', 'CategoryId', 'AuthorId'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName', 'image'],
            }
        });
        result.totalBlogs = await db.Blog.count();
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function singleBlog(req, res, next){
    try {
        let result;
        result = await db.Blog.findByPk(req.params.blogId, {
            attributes: {
                exclude: ['AuthorId', 'updatedAt'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName', 'image'],
            }
        });
        if (!result){
            next(createError(404, "Blog not found"));
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
    blogs,
    singleBlog,
}