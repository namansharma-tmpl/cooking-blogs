const homeRoutes = require('../routes/home');
const blogsRoutes = require('../routes/blogs');
const recipesRoutes = require('../routes/recipes');
const contactRoutes = require('../routes/contact');
const newsletterRoutes = require('../routes/newsletter');
const searchRoutes = require('../routes/search');

module.exports = function (app){
    app.use('/api/home', homeRoutes);
    app.use('/api/blogs', blogsRoutes);
    app.use('/api/recipes', recipesRoutes);
    app.use('/api/contact-us', contactRoutes);
    app.use('/api/newsletter-subscribe', newsletterRoutes);
    app.use('/api/search', searchRoutes);
}