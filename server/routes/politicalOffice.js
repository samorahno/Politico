import express from 'express';
import validatorMiddleWare from '../middleware/validateMiddleware';
import OfficeController from '../controllers/PoliticalOffice';

const router = express.Router();

const { validateCreateOffice } = validatorMiddleWare;

const { createOffice } = OfficeController;

router.post('/offices/', validateCreateOffice, createOffice);

export default router;