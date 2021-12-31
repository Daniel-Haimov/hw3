const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    page_title: String,
    title: String,
    description: String
})

module.exports = mongoose.model('site', siteSchema)