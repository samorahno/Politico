import uuid from 'uuid';
import moment from 'moment';
import dba from '../db/index';

class CandidateController {
  static async viewCandidates(req, res) {
    try {
      const candidate_query = await dba.query(`SELECT politicalparties.name as partyname, politicalparties.alias, politicaloffices.name as officename, users.firstname, users.lastname, users.passporturl 
      FROM candidates, politicaloffices, politicalparties, users 
      WHERE candidates.officeid = politicaloffices.id 
      AND candidates.partyid = politicalparties.id 
      AND candidates.userid = users.id`);
      return res.status(200).send({
        status: 200,
        data: candidate_query.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occured. Try again',
      });
    }
  }

  static async createInterest(req, res) {
    const { officeid, partyid, userid } = req.body;
    const textid_user = 'SELECT * FROM users WHERE id = $1';

    const createQuery = `INSERT INTO 
          interests(id, officeid, partyid, userid, created_date)
          VALUES($1, $2, $3, $4, $5) returning *`;
    try {
      const rowsid = await dba.query(textid_user, [userid]);
      if (rowsid) {
        const values = [
          uuid(),
          officeid,
          partyid,
          userid,
          moment(new Date()),
        ];
        const { rows } = await dba.query(createQuery, values);
        return res.status(201).json({
          status: 201,
          message: 'Interest Successfully Registered',
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

  static async viewAllInterests(req, res) {
    try {
      const candidate_query = await dba.query(`SELECT politicalparties.name as partyname, politicalparties.alias, politicaloffices.name as officename, users.firstname, users.lastname, users.passporturl, interests.officeid, interests.partyid, interests.userid, interests.created_date 
      FROM interests, politicaloffices, politicalparties, users 
      WHERE interests.officeid = politicaloffices.id 
      AND interests.partyid = politicalparties.id 
      AND interests.userid = users.id
      AND interests.status = 0`);
      return res.status(200).send({
        status: 200,
        data: candidate_query.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occured. Try again',
      });
    }
  }

  static async getCandidateByOffice(req, res) {
    const { officeid } = req.params;
    const candidateQuery = `SELECT politicaloffices.name as office, politicalparties.name as party, politicalparties.alias as acronym, users.firstname, users.lastname, candidates.id as candidateid 
    FROM candidates
    join politicaloffices on officeid = politicaloffices.id
    join politicalparties on partyid = politicalparties.id 
    join users on userid = users.id
    WHERE candidates.officeid=$1`;

    try {
      const candidateResult = await dba.query(candidateQuery, [officeid]);
      if (candidateResult) {
        return res.json({
          status: 200,
          data: candidateResult.rows,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occured. Try again',
      });
    }
  }
}

export default CandidateController;
