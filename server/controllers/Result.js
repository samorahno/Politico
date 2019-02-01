import dba from '../db/index';

class ResultController {
  static async getResult(req, res) {
    const { officeid, result } = req.params;
    if (result === 'result') {
      const query_office = 'SELECT * FROM politicaloffices WHERE id = $1';
      const query_result = 'SELECT officeid, candidateid, count(candidateid) as results FROM votes where officeid = $1 GROUP BY candidateid, officeid';

      try {
        const check_office = await dba.query(query_office, [officeid]);
        if (check_office) {
          const check_result = await dba.query(query_result, [officeid]);
          if (check_result.rowCount < 1) {
            return res.status(404).send({
              status: 404,
              error: 'No result found for this office',
            });
          }
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
