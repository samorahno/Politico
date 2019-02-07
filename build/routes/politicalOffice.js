'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateMiddleware = require('../middleware/validateMiddleware');

var _validateMiddleware2 = _interopRequireDefault(_validateMiddleware);

var _PoliticalOffice = require('../controllers/PoliticalOffice');

var _PoliticalOffice2 = _interopRequireDefault(_PoliticalOffice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const { validateCreateOffice } = _validateMiddleware2.default;

const { createOffice, getAllOffices, viewOfficeById } = _PoliticalOffice2.default;

router.post('/offices/', validateCreateOffice, createOffice);
router.get('/offices/', getAllOffices);
router.get('/offices/:officeid/', viewOfficeById);

exports.default = router;