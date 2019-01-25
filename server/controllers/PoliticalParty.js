import politicalParties from '../models/politicalParties';

class PartiesController {

    static createParty(req, res){
        const dateObj = new Date();
        const party = {
            id: politicalParties.length + 1,
            name: req.body.name,
            alias: req.body.alias,
            hqAdress: req.body.hqAdress,
            logoUrl: req.body.logoUrl,
            dateCreated: `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`
        }

        politicalParties.push(party);
      
        res.json({
            status: 200,
            data: [{
                    "id": party.id,
                    "name": party.name
                }]

        })
    }

}

export default PartiesController;