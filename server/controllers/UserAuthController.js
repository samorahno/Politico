/* eslint-disable indent */
import moment from 'moment';
import uuid from 'uuid';
import dba from '../db/index';
import userAuthHelper from '../middleware/userAuth';


/**
 * User Authentication Controller
 */
class UserAuthController {
    static async createUser(req, res) {
      const {
        firstname,
        othername,
        lastname,
        email,
        password,
        phone,
        passporturl,
      } = req.body;

      const createQuery = `INSERT INTO
        users(id, firstname, othername, lastname, email, password, phone, passporturl, created_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`;

      const hashPassword = userAuthHelper.hashPassword(password);

      const values = [
        uuid(),
        firstname,
        othername || '',
        lastname,
        email,
        hashPassword,
        phone,
        passporturl || '',
        moment(new Date()),
      ];

      try {
        const { rows } = await dba.query(createQuery, values);
        const { id, email, isadmin } = rows[0];
        const token = userAuthHelper.generateToken(rows[0].id, rows[0].isadmin);
        return res.status(201).header('x-auth-token', token).json({
          status: 201,
          message: 'User Successfully Created',
          data: [{
            token,
            user: {
              id: rows[0].id,
              firstname: rows[0].firstname,
              othername: rows[0].othername,
              lastname: rows[0].lastname,
              email: rows[0].email,
              phone: rows[0].phone,
            },
          }],
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).json({ status: 400, message: 'Email cannot be used at this time' });
        }
          return res.json({ status: 400, error });
      }
    }

    static async login(req, res) {
      const text = 'SELECT * FROM users WHERE email = $1';
      try {
        const { rows } = await dba.query(text, [req.body.email]);
        if (!rows[0]) {
          return res.status(401).send({ status: 401, message: 'Invalid Email / Password' });
        }
        if (!userAuthHelper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(401).send({ status: 401, message: 'The credentials you provided Are incorrect' });
        }
         const token = userAuthHelper.generateToken(rows[0].id, rows[0].isadmin);
        return res.status(200).header('x-auth-token', token).json({
          status: 200,
          data: [{
            message: `Login Successful, Welcome ${rows[0].firstname}`,
            token,
            user: {
              id: rows[0].id,
              firstname: rows[0].firstname,
              lastname: rows[0].lastname,
              email: rows[0].email,
              phone: rows[0].phone,
              isAdmin: rows[0].isadmin,
            },
          }],
        });
      } catch (error) {
        return res.status(400).json({
          error: 400,
          message: 'An error occured. Please try again',
        });
      }
    }
}
export default UserAuthController;
