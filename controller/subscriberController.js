const {
  getAllSubscribers,
  getOneSubscriberById,
  getOneSubscriberByEmail,
  createSubscribers,
  updateSubscribers,
  deleteSubscribers,
  validate,
} = require('../model/subscriberModel');

const { BadRequestsError, ConflictError } = require('../error-types');

const getMany = async (req, res) => {
  const result = await getAllSubscribers();
  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const result = await getOneSubscriberById(req.params.id);
  res.status(200).json(result);
};

const postOne = async (req, res) => {
  const validatingError = validate(req.body);
  if (validatingError) throw new BadRequestsError(validatingError.message);

  const existingEmail = await getOneSubscriberByEmail(req.body.email);
  if (existingEmail) throw new ConflictError();

  const result = await createSubscribers(req.body);
  res.status(201).json(result);
};

const updateOne = async (req, res) => {
  const result = await updateSubscribers(req.body, req.params.id);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  await deleteSubscribers(req.params.id);
  res.status(204).send('Subscriber deleted');
};

module.exports = {
  getMany,
  getOneById,
  postOne,
  updateOne,
  deleteOne,
};
