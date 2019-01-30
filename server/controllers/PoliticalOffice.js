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
}

export default OfficeController;
