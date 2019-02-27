import uuid from 'uuid';
import moment from 'moment';
import dba from '../db/index';

class VoteController {
  static async createVote(req, res) {
    const { office, candidate } = req.body;
    const { userId } = req.user;

    const textid_voter = 'SELECT * FROM votes WHERE userid = $1 AND officeid = $2';

    const createQuery = `INSERT INTO 
          votes(id, officeid, candidateid, userid, created_date)
          VALUES($1, $2, $3, $4, $5) returning *`;
          
    try {
      const check_voter = await dba.query(textid_voter, [userId, office]);
      if (check_voter.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          message: 'You have voted a candidate for this office',
        });
      }
      const values = [
        uuid(),
        office,
        candidate,
        userId,
        moment(new Date()),
      ];
      const { rows } = await dba.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        message: 'Vote Successfully Registered',
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'Error!, Please check to be a sure a candidate is available',
      });
    }
  }
}

export default VoteController;
