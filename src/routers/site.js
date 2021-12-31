const express = require('express');
const path = require('path');
const router = express.Router();

// mongoosePath = path.join(__dirname, '../moudles/mongoose');
// const mongoose = require(mongoosePath);

let sitePath = path.join(__dirname, '../moudles/siteSchema');
const Site = require(sitePath);

listPath = path.join(__dirname, '../moudles/getList');


function reloadModule(moduleName){
  delete require.cache[require.resolve(moduleName)]
  return require(moduleName)
}


router.get("/:site", getSiteByTitle, (req, res) => {
    let site = res.site;

    let listPromise = reloadModule(listPath);
    
    listPromise.then((list) => {

      res.render('index', { 
        list,
        page_title: `${site.page_title}`,
        title: `${site.title}`,
        description: `<q>${site.description}</q>`
      });

    });

});

async function getSiteByTitle(req, res, next) {
    let site;
    try {
      site = await Site.findOne({title: req.params.site}).exec();
      if (site == null) {
        site = new Site({
            page_title: 'Error',
            title: '404',
            description: 'Cannot find site'
          });
        // return res.status(404).json({ message: 'Cannot find site' });
      }
    } catch (err) {
      site = new Site({
        page_title: 'Error',
        title: '500',
        description: err.message
      });
    }
  
    res.site = site;
    next();
}

module.exports = router;