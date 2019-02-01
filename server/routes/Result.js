import express from 'express';
import verifyTokenObject from '../middleware/VerifyToken';


import ResultController from '../controllers/Result';

const router = express.Router();
const { verifyToken } = verifyTokenObject;

const {
  getResult,
} = ResultController;


router.get('/office/:officeid/:result', verifyToken, getResult);

export default router;
