const {
  getAllSubscribors,
  getOneSubscriborById,
  getOneSubscriborByEmail,
  createSubscribors,
  updateSubscribors,
  deleteSubscribors,
  validate,
} = require('../model/subscriberModel');

const { BadRequestsError, ConflictError } = require('../error-types');

const getMany = async (req, res) => {
  const result = await getAllSubscribors();
  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const result = await getOneSubscriborById(req.params.id);
  res.status(200).json(result);
};

const postOne = async (req, res) => {
  const validatingError = validate(req.body);
  if (validatingError) throw new BadRequestsError();

  const existingEmail = await getOneSubscriborByEmail(req.body.email);
  if (existingEmail) throw new ConflictError();

  const result = await createSubscribors(req.body);
  res.status(201).json(result);
};

const updateOne = async (req, res) => {
  const result = await updateSubscribors(req.body, req.params.id);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  await deleteSubscribors(req.params.id);
  res.status(204).send('Subscriber deleted');
};

module.exports = {
  getMany,
  getOneById,
  postOne,
  updateOne,
  deleteOne,
};
