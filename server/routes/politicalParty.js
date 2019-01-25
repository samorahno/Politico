import express from 'express';
import ValidatorMware from '../middleware/validateMiddleware';

import PartiesController from '../controllers/PoliticalParty';

const router = express.Router();

const {validateCreateParty} = ValidatorMware;


const {createParty} = PartiesController;

router.post('/parties/', validateCreateParty, createParty);

export default router;