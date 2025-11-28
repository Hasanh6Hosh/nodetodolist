const express = require('express');
const router = express.Router();

const {valuesToAdd,encrypPass,valuesToLogin} = require('../middelware/auth_MID.js');
const {register,login} = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encrypPass,register);
router.post('/login',valuesToLogin,login);

module.exports = router;