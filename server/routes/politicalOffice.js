import express from 'express';
import validatorMiddleWare from '../middleware/validateMiddleware';
import OfficeController from '../controllers/PoliticalOffice';
import verifyTokenObject from '../middleware/VerifyToken';
import VerifyIsAdmin from '../middleware/VerifyIsAdmin';

const router = express.Router();
const { verifyToken } = verifyTokenObject;
const { verifyIsAdmin } = VerifyIsAdmin;

const { validateCreateOffice } = validatorMiddleWare;

const {
  createOffice,
  getAllOffices,
  viewOfficeById,
  createCandidate,
} = OfficeController;

router.post('/offices/', verifyToken, verifyIsAdmin, validateCreateOffice, createOffice);
router.get('/offices/', verifyToken, getAllOffices);
router.get('/offices/:officeid/', verifyToken, viewOfficeById);
router.post('/office/:userid/:register/', verifyToken, verifyIsAdmin, createCandidate);

export default router;
