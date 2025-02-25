const EmployeeService = require('../services/employee.service');
const AddressService = require('../services/address.service');

const getAll = async (_req, res) => {
  try {
    const employees = await EmployeeService.getAll();
    return res.status(200).json(employees);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeService.getById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    if (req.query.includeAddresses === 'true') {
      const addresses = await AddressService.getAllByEmployeeId(id);
      return res.status(200).json({ employee, addresses });
    }

    return res.status(200).json(employee);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const insert = async (req, res) => {
  try {
    const { firstName, lastName, age, city, street, number } = req.body;

    const employee = await EmployeeService.insert(
      { firstName, lastName, age, city, street, number }
    );

    return res.status(201).json({ id: employee.id, message: 'Cadastro com sucesso' });;
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ocorreu um erro' })
  }
};

module.exports = {
  getAll,
  getById,
  insert,
};