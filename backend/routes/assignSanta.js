const express = require('express');
const assignSanta   = require('../controllers/assignSanta');

const router = express.Router();

router.patch('/assign', assignSanta); 
module.exports = router;