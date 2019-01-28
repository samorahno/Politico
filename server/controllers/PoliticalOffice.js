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
}

export default OfficeController;
