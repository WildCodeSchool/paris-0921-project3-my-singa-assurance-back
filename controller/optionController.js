const { getAllOptions } = require('../model/optionModel');

const getMany = async (req, res) => {
  const result = await getAllOptions();
  res.status(200).json(result);
};

module.exports = {
  getMany,
};
