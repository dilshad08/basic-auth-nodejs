const createError = require('http-errors');
const { checkLowerCaseAlphabets, checkSpecialChar, checkValidLowerUpperCase } = require('../helpers/validation');
const { isDef, signAccessToken, cryptPassword, comparePassword, successHandler } = require('../helpers/helper');
const {
  isEmpty,
  size,
} = require('lodash');

const User = require('../Models/auth.model');

module.exports = {

  // User registration controller
  userSignUp: async (req, res, next) => {
    try {

      const {
        username,
        password,
        fname,
        lname
      } = req.body;


      // Validation for username
      if (
        (!isDef(username) || isEmpty(username))
      ) {
        throw createError(400, "fields can't be empty");
      }
      
      if(!checkLowerCaseAlphabets(username) || size(username) < 4){
        throw createError(400, 'username check failed'); 
      }

      // Validation for password
      if (
        (!isDef(password) || isEmpty(password))
      ) {
        throw createError(400, "fields can't be empty");
      }

      if(!checkSpecialChar(password) || size(password) < 5){
        throw createError(400, "password check failed")
      }

      // Validation for first name
      if (
        (!isDef(fname) || isEmpty(fname))
      ) {
        throw createError(400, "fields can't be empty");
      }
      
      if(!checkValidLowerUpperCase(fname)){
        throw createError(400, "fname or lname check failed");
      }

      // Validation for last name
      if (
        (!isDef(lname) || isEmpty(lname))
      ) {
        throw createError(400, "fields can't be empty");
      }
      if(!checkValidLowerUpperCase(lname)){
        throw createError(400, "fname or lname check failed");
      }

      const hasUser = await User.findByUsername(username);
      if(hasUser){
        throw createError(400, "username already exists");

      }
      const hashedPassword = await cryptPassword(password);
      console.log(hashedPassword);
      const user = new User({ username: username, password: hashedPassword, fname: fname, lname:lname});
      const result = await user.save();
      successHandler(res, 'SignUp success. Please proceed to Signin', null, null);

    } catch (error) {
      next(error)
    }
  },


  // User Login Controller
  userSignIn: async (req, res, next) => {

    try {
      const {
        username,
        password,
      } = req.body;

      // Validation for username
      if (
        (!isDef(username) || isEmpty(username))
      ) {
        throw createError(400, 'Please provide username and password');
      }

      // Validation for password
      if (
        (!isDef(password) || isEmpty(password))
      ) {
        throw createError(400, 'Please provide username and password');
      }

      const isValidUser = await User.findByUsername(username);
      if(!isValidUser){
        throw createError(401, 'Invalid username/password');
      }

      const isValidPassword = await comparePassword(password, isValidUser.password);
      if(!isValidPassword){
        throw createError(401, 'Invalid username/password');
      }

      const accessToken = signAccessToken(username, isValidUser.fname);
      if (!isDef(accessToken)) {
        throw createError.BadRequest("Something went wrong");
      }

      successHandler(res, 'Signin success', null, accessToken)
    } catch (error) {
      next(error)
    }
  },

  getUserInfo:  async (req, res, next) => {
    
    try {

      const user = await User.findByUsername(req.decoded.username);

      const data = {
        fname: user.fname,
        lname: user.lname,
        password: user.password
      }
      successHandler(res, null, data, null)

    } catch (error) {
      next(error)
    }
  }

};
