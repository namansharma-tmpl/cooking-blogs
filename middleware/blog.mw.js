const blog_ctrl = require('../controllers/blog.ctrl');
const author_ctrl = require('../controllers/author.ctrl');

async function get_blogs_list(pageNo){
    pageNo = parseInt(pageNo);
    pageNo = !pageNo? 1: pageNo;
    let result;
    try {
        result = await blog_ctrl.get_blogs_list(pageNo);
    }
    catch (err){
        return {status: 500};
    }
    try {
        for (let blog of result){
            let author = await author_ctrl.get_author_details(blog.dataValues.AuthorId);
            blog.dataValues.authorFirstName = author.firstName;
            blog.dataValues.authorLastName = author.lastName;
            blog.dataValues.authorImage = author.image;
            delete blog.dataValues.AuthorId;
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

async function get_blog_details(blogId){
    let result;
    try {
        result = await blog_ctrl.get_blog_details(blogId);
        if (!result){
            return {status: 404};
        }
        let author = await author_ctrl.get_author_details(result.dataValues.AuthorId);        
        result.dataValues.authorFirstName = author.firstName;
        result.dataValues.authorLastName = author.lastName;
        result.dataValues.authorImage = author.image;
        delete result.dataValues.AuthorId;
    }
    catch (err){
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    get_blog_details,
    get_blogs_list,
}