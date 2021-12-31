const express = require('express');
const path = require('path');
const staticPath = path.join(__dirname, '../../static');

const router = express.Router();

router.get("/:fileName", (req, res) => {
    res.sendFile(staticPath + `/${req.params.fileName}`);
});

router.get("/:dir/:fileName", (req, res) => {
    res.sendFile(staticPath + `/${req.params.dir}/${req.params.fileName}`);
});

module.exports = router;