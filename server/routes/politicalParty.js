import express from 'express';
import ValidatorMware from '../middleware/validateMiddleware';
import verifyTokenObject from '../middleware/VerifyToken';
import VerifyIsAdmin from '../middleware/VerifyIsAdmin';

import PartiesController from '../controllers/PoliticalParty';

const router = express.Router();
const { verifyToken } = verifyTokenObject;
const { verifyIsAdmin } = VerifyIsAdmin;

const { validateCreateParty, validateEditParty } = ValidatorMware;


const {
  createParty,
  viewPartyById,
  getAllParties,
  deletePartyById,
  editPartyName,
} = PartiesController;

router.post('/parties/', verifyToken, verifyIsAdmin, validateCreateParty, createParty);
router.get('/parties/:partyid', verifyToken, viewPartyById);
router.get('/parties/', verifyToken, getAllParties);
router.delete('/parties/:partyid', verifyToken, verifyIsAdmin, deletePartyById);
router.patch('/parties/:partyid/:name', verifyToken, verifyIsAdmin, validateEditParty, editPartyName);

export default router;
