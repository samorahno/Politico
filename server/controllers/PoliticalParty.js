import uuid from 'uuid';
import moment from 'moment';
import dba from '../db/index';

class PartiesController {
  static async createParty(req, res) {
    const createQuery = `INSERT INTO 
      politicalparties(id, name, alias, hqaddress, logourl, datecreated)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;

    const values = [
      uuid(),
      req.body.name,
      req.body.alias,
      req.body.hqAddress,
      req.body.logoUrl,
      moment(new Date()),
    ];

    try {
      const { rows } = await dba.query(createQuery, values);
      res.status(201).json({
        status: 201,
        message: 'Party Successfully Created',
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  static async viewPartyById(req, res) {
    const { partyid } = req.params;
    const text = 'SELECT * FROM politicalparties WHERE id = $1';

    try {
      const { rows } = await dba.query(text, [partyid]);
      return res.status(200).send({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: 'The record with the given id was not found',
      });
    }
  }

  static async getAllParties(req, res) {
    try {
      const result = await dba.query('SELECT * FROM politicalparties');
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


  static async deletePartyById(req, res) {
    const deleteQuery = 'DELETE FROM politicalparties WHERE id=$1 returning *';
    try {
      const { rows } = await dba.query(deleteQuery, [req.params.partyid]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 400,
          message: 'Party not found',
        });
      }
      return res.status(202).json({
        status: 202,
        data: [{
          id: rows[0].id,
          message: 'Party Delete Successful',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'An error occured, try again later',
      });
    }
  }

  static async editPartyName(req, res) {
    const { partyid, name } = req.params;
    if (name === 'name') {
      const textid = 'SELECT * FROM politicalparties WHERE id = $1';
      const text = 'UPDATE politicalparties SET name=$1,datemodified=$2  WHERE id=$3 RETURNING *';

      try {
        const rowsid = await dba.query(textid, [partyid]);
        if (rowsid) {
          const result = await dba.query(text, [req.body.name, moment(new Date()), partyid]);
          res.status(200).json({
            status: 200,
            message: 'Party Edit Successful',
            data: [{
              id: result.rows[0].id,
              name: result.rows[0].name,
              editedon: result.rows[0].datemodified,
            }],

          });
        }
      } catch (error) {
        return res.status(404).json({
          status: 404,
          message: 'The record with the given id was not found',
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: 'Page not found',
      });
    }
  }
}
export default PartiesController;
