// run MongoDB
require('./src/moudles/mongoose');

const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();


const app = require('./src/moudles/app');
const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`));

const listPath = './src/moudles/getList';

function reloadModule(moduleName){
    delete require.cache[require.resolve(moduleName)];
    return require(moduleName);
}

app.get('', (req, res) => {
    let listPromise = reloadModule(listPath);
    listPromise.then((list) => {
        res.render('index', { 
            list: list,
            page_title: 'Home',
            title: 'Home',
            description: 'Lorem'
        });
    });
});



app.get('/addSitePage', (req, res) => {
    let compiledScript = ejs.compile(fs.readFileSync('./views/scripts/addSiteScript.ejs', 'utf8'));
    let script = compiledScript();

    let compiled = ejs.compile(fs.readFileSync('./views/addSiteForm.ejs', 'utf8'));
    let html = compiled({script});

    let listPromise = reloadModule(listPath);
    listPromise.then((list) => {
        res.render('index', { 
            list,
            page_title: 'ADD SITE',
            title: 'Add Site',
            description: html
        });
    });
});

app.get('/removeSite', (req, res) => {
    let compiledScript = ejs.compile(fs.readFileSync('./views/scripts/removeSiteScript.ejs', 'utf8'));
    let script = compiledScript();

    let compiledForm = ejs.compile(fs.readFileSync('./views/removeSiteForm.ejs', 'utf8'));
    let html = compiledForm({script});

    let listPromise = reloadModule(listPath);
    listPromise.then((list) => {
        res.render('index', { 
            list,
            page_title: 'REMOVE SITE',
            title: 'Remove Site',
            description: html
        });
    });
});
