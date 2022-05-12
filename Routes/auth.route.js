const router = require('express').Router();
const AuthController = require('../Controllers/auth.controller');

const { verifyToken } = require('../Helpers/helper');



router.post('/signin', AuthController.userSignIn)

router.post('/signup', AuthController.userSignUp)

router.get('/user/me', verifyToken, AuthController.getUserInfo)

module.exports = router