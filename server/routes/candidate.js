import express from 'express';
import verifyTokenObject from '../middleware/VerifyToken';
import CandidateController from '../controllers/CandidateController';
import verifyUserInterestExistence from '../middleware/candidateMiddleware';
import VerifyIsAdmin from '../middleware/VerifyIsAdmin';

const router = express.Router();
const { verifyToken } = verifyTokenObject;
const { viewCandidates, createInterest, viewAllInterests } = CandidateController;
const { VerifyUserInterestExistence } = verifyUserInterestExistence;
const { verifyIsAdmin } = VerifyIsAdmin;

router.get('/candidates/', viewCandidates);
router.post('/interest/', verifyToken, VerifyUserInterestExistence, createInterest);
router.get('/interest/', verifyToken, verifyIsAdmin, viewAllInterests);

export default router;
