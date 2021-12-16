const { subscribors, createSubscribors, updateSubscribors } = require('../model/subscriberModel');

const getMany = async (req, res) => {
  try {
    const result = await subscribors();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const postOne = async (req, res) => {
  try {
    const result = await createSubscribors(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const updateOne = async (req, res) => {
  try {
    const result = await updateSubscribors(req.body, req.params.id);
    res.status(200).json(...result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getMany,
  postOne,
  updateOne,
};
