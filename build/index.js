'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _politicalParty = require('./routes/politicalParty');

var _politicalParty2 = _interopRequireDefault(_politicalParty);

var _politicalOffice = require('./routes/politicalOffice');

var _politicalOffice2 = _interopRequireDefault(_politicalOffice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
const app = (0, _express2.default)();

app.use(_express2.default.json());
app.get('/api/v1', (req, res) => res.send({
  status: 200,
  message: 'Welcome to Politico'
}));

// middleware
app.use('/api/v1', _politicalParty2.default);
app.use('/api/v1', _politicalOffice2.default);

app.get('*', (req, res) => res.status(404).json({ message: 'Page not found. Please visit /api/v1' }));

const port = 3000;
// eslint-disable-next-line no-console
app.listen(process.env.port || `${port}`, () => console.log(`server running at localhost ${port}`));

exports.default = app;