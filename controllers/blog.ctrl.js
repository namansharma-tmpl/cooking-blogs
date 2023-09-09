const db = require('../models/index');

async function get_blogs_list(pageNo){
    return await db.Blog.findAll({
        limit: 6,
        offset: (pageNo - 1) * 6,
        attributes: {
            exclude: ['updatedAt', 'content', 'CategoryId'],
        }
    });
}

async function get_blog_details(id){
    return await db.Blog.findByPk(id);
}

module.exports = {
    get_blog_details,
    get_blogs_list,
}