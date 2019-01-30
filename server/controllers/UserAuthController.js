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
        othername,
        lastname,
        email,
        hashPassword,
        phone,
        passporturl,
        moment(new Date()),
      ];

      try {
        const { rows } = await dba.query(createQuery, values);
        const { id, email, isadmin } = rows[0];
        const token = userAuthHelper.generateToken({ id, email, isadmin });
        return res.status(201).header('x-auth-token', token).json({
          status: 201,
          data: [{
            token,
            user: rows[0],
          }],
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ status: 400, message: 'Email cannot be used at this time' });
        }
          return res.json({ status: 400, error });
      }
    }
}
export default UserAuthController;
