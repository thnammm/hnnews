var categoryModel = require('../models/category.model.js');

module.exports = (req, res, next) => {
    var category = categoryModel.catofcat();
    var subcategory = categoryModel.subcatofcat();

    Promise.all([category, subcategory])
        .then(([category, subcategory]) => {
            res.locals.listCategory = category[0];
            res.locals.listSubCategory = subcategory[0];
            next();
        }).catch(err => {
            console.log(err);
        })
}