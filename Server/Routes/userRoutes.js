const express = require('express');
const router = express.Router();
const { register, login, getAllUsersDetails } = require('../Controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/users/details', getAllUsersDetails);

module.exports = router;