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
            data: [party],
        })
    }

    static viewPartyById(req, res){
        const {partyid}  = req.params;
        const party = politicalParties.find(p => p.id === parseInt(partyid));
        if(!party){
            return res.status(404).send({
                status: 404,
                message: 'The record with the given id was not found',
            });
        }
        return res.status(200).json({
            status: 200,
            data: [party]
        });
    }

static getAllParties(req, res){
        res.json({
            status: 200,
            data: politicalParties
        });
    }

}

export default PartiesController;