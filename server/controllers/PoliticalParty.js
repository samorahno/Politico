import politicalParties from '../models/politicalParties';

const dateObj = new Date();
class PartiesController {
  static createParty(req, res) {
    const party = {
      id: politicalParties.length + 1,
      name: req.body.name,
      alias: req.body.alias,
      hqAdress: req.body.hqAdress,
      logoUrl: req.body.logoUrl,
      dateCreated: `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`,
    };

    politicalParties.push(party);

    res.status(201).json({
      status: 201,
      message: 'Party Successfully Created',
      data: [party],
    });
  }

  static viewPartyById(req, res) {
    const { partyid } = req.params;
    const party = politicalParties.find(p => p.id === parseInt(partyid));
    if (!party) {
      return res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [party],
    });
  }

  static getAllParties(req, res) {
    res.json({
      status: 200,
      data: politicalParties,
    });
  }

  static deletePartyById(req, res) {
    const { partyid } = req.params;
    const findParty = politicalParties.find(x => x.id === parseInt(partyid));
    if (!findParty) {
      return res.status(404).json({
        status: 404,
        message: 'Party not found',
      });
    }

    const index = politicalParties.indexOf(findParty);
    const delparty = politicalParties.splice(index, 1);
    if (!delparty) {
      return res.status(400).json({
        status: 400,
        message: 'An error occured, try again later',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Party Delete Successful',
      data: [findParty],
    });
  }

  static editPartyName(req, res) {
    const { partyid, name } = req.params;
    if (name === 'name') {
      const party = politicalParties.find(x => x.id === parseInt(partyid));
      if (!party) {
        return res.status(404).send({
          status: 404,
          message: 'The record with the given id was not found',
        });
      }

      const dateObj = new Date();
      party.name = req.body.name;
      party.editedon = `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`;

      return res.json({
        status: 200,
        message: 'Party Edit Successful',
        data: [{
          id: party.id,
          name: party.name,
          editedon: party.editedon,
        }],
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'Page not found',
    });
  }
}

export default PartiesController;
