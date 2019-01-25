import Validator from './Validator';

const { validateString, validateAddress } = Validator;

export default class ValidatorMware {
    static validateCreateParty(req, res, next) {
        const { name, alias, hqAddress, logoUrl } = req.body;

        if (!validateString(name)) {
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


        if (!validateAddress(hqAddress)) {
            return res.status(400).send({
                status: 400,
                error: 'enter a valid address',
            });
        }

        return next();
    }
}

