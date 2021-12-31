const path = require('path');
const express = require('express');
const app = express();


const staticRouterPath = path.join(__dirname, '../routers/static');
const staticRouter = require(staticRouterPath);
app.use('/static', staticRouter);

const siteRouterPath = path.join(__dirname, '../routers/site');
const siteRouter = require(siteRouterPath);
app.use('/site', siteRouter);

app.use(express.json());

const dbControllerPath = path.join(__dirname, '../routers/dbController');
const dbControllerRouter = require(dbControllerPath);
app.use('/db', dbControllerRouter);

// const dataPath = path.join(__dirname, '../routers/data');
// const dataRouter = require(dataPath);
// app.use('/data', dataRouter);


// Set Views
const viewsPath = path.join(__dirname, '../../views');
app.set('views', viewsPath)
app.set('view engine', 'ejs')

module.exports = app;