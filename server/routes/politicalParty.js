import express from 'express';
import ValidatorMware from '../middleware/validateMiddleware';

import PartiesController from '../controllers/PoliticalParty';

const router = express.Router();

const {validateCreateParty} = ValidatorMware;


const {createParty, viewPartyById} = PartiesController;

router.post('/parties/', validateCreateParty, createParty);
router.get('/party/:partyid', viewPartyById);

export default router;