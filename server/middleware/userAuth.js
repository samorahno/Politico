import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userAuthHelper = {
	
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  ispasswordValid(password) {
    if (password.length > 4) return true;
    return false;
  },

  doesPasswordMatch(password, confirmPassword) {
    if (password === confirmPassword) return true;
    return false;
  },
  isWhiteSpace(email, password, confirmPassword) {
    if (email.includes(' ')) return false;
    if (typeof password === 'string' && password.includes(' ')) return false;
    if (typeof confirmPassword === 'string' && confirmPassword.includes(' ')) return false;
    return true;
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
      process.env.jwt_privateKey, { expiresIn: '7d' },
    );
    return token;
  },

};
export default userAuthHelper;