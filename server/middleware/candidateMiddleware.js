import dba from '../db/index';

class CandidateMiddleware {
  static async VerifyCandiateExistence(req, res, next) {
    const { userid } = req.params;
    const query = 'SELECT * FROM candidates WHERE userid = $1';
    try {
      const query_result = await dba.query(query, [userid]);
      if (query_result.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          message: 'Candidate already registered for an office',
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
}

export default CandidateMiddleware;
