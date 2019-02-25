import uuid from 'uuid';
import moment from 'moment';
import dba from '../db/index';


class OfficeController {
  static async createOffice(req, res) {
    const createQuery = `INSERT INTO 
      politicaloffices(id, name, type, created_date, status)
      VALUES($1, $2, $3, $4, $5) returning *`;

    const values = [
      uuid(),
      req.body.name,
      req.body.type,
      moment(new Date()),
      req.body.status || 'on',
    ];

    try {
      const { rows } = await dba.query(createQuery, values);
      res.status(201).json({
        status: 201,
        message: 'Office Successfully Created',
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Error inserting record, please try again',
      });
    }
  }

  static async getAllOffices(req, res) {
    try {
      const result = await dba.query('SELECT * FROM politicaloffices');
      return res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async viewOfficeById(req, res) {
    const { officeid } = req.params;
    const text = 'SELECT * FROM politicaloffices WHERE id = $1';
    try {
      const { rows } = await dba.query(text, [officeid]);
      return res.status(200).send({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: 'Office not found',
      });
    }
  }

  static async createCandidate(req, res) {
    const { userid, register } = req.params;
    const { officeid, partyid } = req.body;
    if (register === 'register') {
      const textid_user = 'SELECT * FROM users WHERE id = $1';
      const textid_office = 'SELECT * FROM politicaloffices WHERE id = $1';
      const textid_party = 'SELECT * FROM politicalparties WHERE id = $1';

      const createQuery = `INSERT INTO 
      candidates(id, officeid, partyid, userid, created_date)
      VALUES($1, $2, $3, $4, $5) returning *`;

      const updateInterestQuery = 'UPDATE interests SET status=$1 WHERE userid=$2 RETURNING *';
      try {
        const rowsid = await dba.query(textid_user, [userid]);
        const check_office = await dba.query(textid_office, [officeid]);
        const check_party = await dba.query(textid_party, [partyid]);
        if (rowsid && check_office && check_party) {
          const values = [
            uuid(),
            officeid,
            partyid,
            userid,
            moment(new Date()),
          ];
          const { rows } = await dba.query(createQuery, values);
          const updateInterest = await dba.query(updateInterestQuery, [1, userid]);
          return res.status(201).json({
            status: 201,
            message: 'Candidate Successfully Created',
            data: [rows[0]],
          });
        }
      } catch (error) {
        return res.status(404).json({
          status: 404,
          message: 'User, office or party not found',
        });
      }
    }
    return res.status(404).json({
      status: 404,
      message: 'Page not found',
    });
  }
}
export default OfficeController;
