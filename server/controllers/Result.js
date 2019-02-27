import dba from '../db/index';

class ResultController {
  static async getResult(req, res) {
    const { officeid, result } = req.params;
    if (result === 'result') {
      const query_office = 'SELECT * FROM politicaloffices WHERE id = $1';
      const query_result = `SELECT votes.officeid, users.firstname, users.lastname, politicalparties.name as party, politicalparties.alias as acronym, count(candidateid) as votes
        FROM votes, candidates, users, politicalparties
        WHERE votes.candidateid = candidates.id
        AND candidates.userid = users.id
        AND candidates.partyid = politicalparties.id
        AND votes.officeid = $1
        GROUP BY votes.officeid, votes.candidateid, users.firstname, users.lastname, politicalparties.name, politicalparties.alias`;
      try {
        const check_office = await dba.query(query_office, [officeid]);
        if (check_office) {
          const check_result = await dba.query(query_result, [officeid]);
          return res.status(200).send({
            status: 200,
            data: check_result.rows,
          });
        }
      } catch (error) {
        return res.status(404).json({
          status: 404,
          message: 'An error occured',
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

export default ResultController;
