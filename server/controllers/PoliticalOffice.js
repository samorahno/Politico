import politicalOffices from '../models/politicalOffices';

const dateObj = new Date();

class OfficeController {
  static createOffice(req, res) {
    const office = {
      id: politicalOffices.length + 1,
      name: req.body.name,
      type: req.body.type,
      dateCreated: `${dateObj.getFullYear()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getDate()}`,
    };

    politicalOffices.push(office);

    res.status(201).json({
      status: 201,
      message: 'Office Successfully Created',
      data: [office],
    });
  }

  static getAllOffices(req, res) {
    res.json({
      status: 200,
      data: politicalOffices,
    });
  }

  static viewOfficeById(req, res) {
    const { officeid } = req.params;
    const office = politicalOffices.find(x => x.id === parseInt(officeid));

    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'Office not found',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [office],
    });
  }
}

export default OfficeController;
