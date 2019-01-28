import express from 'express';
import ValidatorMware from '../middleware/validateMiddleware';

import PartiesController from '../controllers/PoliticalParty';

const router = express.Router();

const { validateCreateParty, validateEditParty } = ValidatorMware;


const {
  createParty,
  viewPartyById,
  getAllParties,
  deletePartyById,
  editPartyName,
} = PartiesController;

router.post('/parties/', validateCreateParty, createParty);
router.get('/party/:partyid', viewPartyById);
router.get('/parties/', getAllParties);
router.delete('/parties/:partyid', deletePartyById);
router.patch('/parties/:partyid/:name', validateEditParty, editPartyName);

export default router;
