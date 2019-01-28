import Validator from './Validator';

const { validateString, validateAddress } = Validator;

export default class ValidatorMware {
  static validateCreateParty(req, res, next) {
    const { name, alias, hqAddress } = req.body;

    if (!name || !validateString(name)) {
      return res.status(400).send({
        status: 400,
        error: 'enter name of the party',
      });
    }

    if (alias) {
      if (alias.length > 5) {
        return res.status(400).send({
          status: 400,
          error: 'enter a valid alias',
        });
      }
    }


    if (!hqAddress || !validateAddress(hqAddress)) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid address',
      });
    }

    return next();
  }

  static validateCreateOffice(req, res, next) {
    const { name, type } = req.body;
    if (!name || !validateString(name)) {
      return res.status(400).send({
        status: 400,
        error: 'Enter office name',
      });
    }
    if (!type) {
      return res.status(400).send({
        status: 400,
        error: 'Enter office type',
      });
    }
    const typeVal = type.toUpperCase();

    switch (typeVal) {
      case 'FEDERAL':
        return next();
        break;

      case 'LEGISLATIVE':
        return next();
        break;

      case 'STATE':
        return next();
        break;

      case 'LOCAL GOVERNMENT':
        return next();
        break;

      default:
        return res.status(400).send({
          status: 400,
          error: 'Enter office type (example: Federal, Legislative, State or Local Government)',
        });
    }
    return next();
  }

  static validateEditParty(req, res, next) {
    const { name } = req.body;
    if (!name || !validateString(name)) {
      return res.status(400).send({
        status: 400,
        error: 'Enter new name of the party',
      });
    }
    return next();
  }
}
