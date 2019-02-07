'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _politicalOffices = require('../models/politicalOffices');

var _politicalOffices2 = _interopRequireDefault(_politicalOffices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dateObj = new Date();

class OfficeController {
  static createOffice(req, res) {
    const office = {
      id: _politicalOffices2.default.length + 1,
      name: req.body.name,
      type: req.body.type,
      dateCreated: `${dateObj.getFullYear()} - ${dateObj.getMonth() + 1} - ${dateObj.getDate()}`
    };

    _politicalOffices2.default.push(office);

    res.status(201).json({
      status: 201,
      message: 'Office Successfully Created',
      data: [office]
    });
  }

  static getAllOffices(req, res) {
    res.json({
      status: 200,
      data: _politicalOffices2.default
    });
  }

  static viewOfficeById(req, res) {
    const { officeid } = req.params;
    const office = _politicalOffices2.default.find(x => x.id === parseInt(officeid));

    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'Office not found'
      });
    }

    return res.status(200).json({
      status: 200,
      data: [office]
    });
  }
}

exports.default = OfficeController;