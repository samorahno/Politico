import jwt from 'jsonwebtoken';
import dba from '../db/index';

const verifyTokenObj = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ status: 401, message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.jwt_privateKey);
      req.user = decoded;
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await dba.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          message: 'The token you provided is invalid',
        });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default verifyTokenObj;
