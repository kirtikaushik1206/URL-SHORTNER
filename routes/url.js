const express = require('express');
const { handGenerateNewShortURL } = require("../controllers/url");

const router = express.Router();

router.post('/' , handGenerateNewShortURL);
 mmodule.exports = router;