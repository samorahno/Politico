import express from 'express';


import ResultController from '../controllers/Result';

const router = express.Router();

const {
  getResult,
} = ResultController;


router.get('/office/:officeid/:result', getResult);

export default router;
