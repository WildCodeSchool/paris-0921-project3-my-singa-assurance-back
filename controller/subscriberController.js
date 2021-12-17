const {
  getAllSubscribors,
  getOneSubscriborById,
  createSubscribors,
  updateSubscribors,
  deleteSubscribors,
  validate,
} = require('../model/subscriberModel');

const getMany = async (req, res) => {
  try {
    const result = await getAllSubscribors();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const getOneById = async (req, res) => {
  try {
    const result = await getOneSubscriborById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const postOne = async (req, res) => {
  try {
    const validatingError = validate(req.body);
    if (validatingError) {
      console.log(validatingError);
      return res.status(401).send('Invalid input');
    }
    const result = await createSubscribors(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};

const updateOne = async (req, res) => {
  try {
    const result = await updateSubscribors(req.body, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const deleteOne = async (req, res) => {
  try {
    await deleteSubscribors(req.params.id);
    res.status(204).send('Subscriber deleted');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getMany,
  getOneById,
  postOne,
  updateOne,
  deleteOne,
};
