import express from 'express';
import validatorMiddleWare from '../middleware/validateMiddleware';
import OfficeController from '../controllers/PoliticalOffice';
import verifyTokenObject from '../middleware/VerifyToken';
import VerifyIsAdmin from '../middleware/VerifyIsAdmin';
import CandidateMiddleware from '../middleware/candidateMiddleware';

const router = express.Router();
const { verifyToken } = verifyTokenObject;
const { verifyIsAdmin } = VerifyIsAdmin;
const { VerifyCandiateExistence } = CandidateMiddleware;

const { validateCreateOffice } = validatorMiddleWare;

const {
  createOffice,
  getAllOffices,
  viewOfficeById,
  createCandidate,
} = OfficeController;

router.post('/offices/', verifyToken, verifyIsAdmin, validateCreateOffice, createOffice);
router.get('/offices/', getAllOffices);
router.get('/offices/:officeid/', viewOfficeById);
router.post('/office/:userid/:register/', verifyToken, verifyIsAdmin, VerifyCandiateExistence, createCandidate);

export default router;
