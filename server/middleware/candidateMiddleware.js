import dba from '../db/index';

class CandidateMiddleware {
  static async VerifyCandiateExistence(req, res, next) {
    // const { userid } = req.params;
    const { officeid, partyid, userid } = req.body;
    const query = 'SELECT * FROM candidates WHERE userid = $1';
    const checkOffice = 'SELECT * FROM candidates WHERE officeid = $1 AND partyid = $2';

    try {
      const query_checkOffice = await dba.query(checkOffice, [officeid, partyid]);
      const query_result = await dba.query(query, [userid]);
      if (query_result.rowCount > 0 || query_checkOffice.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'Candidate already registered for office',
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'An error occured. Please try again',
      });
    }
    return next();
  }

  static async VerifyUserInterestExistence(req, res, next) {
    const { userid } = req.body;

    const query_interest = 'SELECT * FROM interests WHERE userid = $1';
    try {
      const query_result = await dba.query(query_interest, [userid]);
      if (query_result.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'You have an interest registered',
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'An error occured. Try again later',
      });
    }
    return next();
  }
}

export default CandidateMiddleware;
