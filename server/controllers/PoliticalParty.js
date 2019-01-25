import politicalParties from '../models/politicalParties';

const dateObj = new Date();
class PartiesController {
    
    static createParty(req, res){
        
        const party = {
            id: politicalParties.length + 1,
            name: req.body.name,
            alias: req.body.alias,
            hqAdress: req.body.hqAdress,
            logoUrl: req.body.logoUrl,
            dateCreated: `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`
        }

        politicalParties.push(party);
      
        res.status(201).json({
            status: 201,
            message: "Party Successfully Created",
            data: [{
                    "id": party.id,
                    "name": party.name,
                    "hqAddress": party.hqAdress,
                    "Alias": party.alias
                }]

        })
    }

}

export default PartiesController;