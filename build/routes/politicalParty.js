'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateMiddleware = require('../middleware/validateMiddleware');

var _validateMiddleware2 = _interopRequireDefault(_validateMiddleware);

var _PoliticalParty = require('../controllers/PoliticalParty');

var _PoliticalParty2 = _interopRequireDefault(_PoliticalParty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const { validateCreateParty, validateEditParty } = _validateMiddleware2.default;

const {
  createParty,
  viewPartyById,
  getAllParties,
  deletePartyById,
  editPartyName
} = _PoliticalParty2.default;

router.post('/parties/', validateCreateParty, createParty);
router.get('/parties/:partyid', viewPartyById);
router.get('/parties/', getAllParties);
router.delete('/parties/:partyid', deletePartyById);
router.patch('/parties/:partyid/:name', validateEditParty, editPartyName);

exports.default = router;