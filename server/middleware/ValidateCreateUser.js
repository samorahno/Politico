import userAuthHelper from './userAuth';
import validator from './Validator';


class ValidateCreateUser {
  static validateCreate(req, res, next) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.phone
      || !req.body.password || !req.body.confirmPassword) {
      return res.status(400).send({
        status: 400,
        error: 'Please check your input--some input missing',
      });
    }
    if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({
        status: 400,
        error: 'White Space are not allowed in input fields',
      });
    }
    if (!validator.validateString(req.body.firstname) || !validator.validateString(req.body.lastname)) {
      return res.status(400).send({
        status: 400,
        error: 'Name Is Invalid',
      });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(400).send({
        status: 400,
        error: 'Password Must Be at least Five Characters',
      });
    }
    if (!userAuthHelper.doesPasswordMatch(req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({
        status: 400,
        error: 'Passwords Do not match',
      });
    }

    next();
  }


  static validateLogin(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send({
        status: 401,
        message: 'Some values are missing',
      });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(401).send({
        status: 401,
        message: 'Please enter a valid email address',
      });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(401).send({
        status: 401,
        error: 'Password Must Be at least Five Characters',
      });
    }

    next();
  }
}

export default ValidateCreateUser;
