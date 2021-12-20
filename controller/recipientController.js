const {
  getAllRecipients,
  getOneRecipientByEmail,
  getOneRecipientById,
  createRecipients,
  updateRecipients,
  deleteRecipients,
  validate,
} = require('../model/recipientModel');

const getMany = async (req, res) => {
  try {
    const result = await getAllRecipients();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const getOneById = async (req, res) => {
  try {
    const result = await getOneRecipientById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const postOne = async (req, res) => {
  try {
    const validatingError = validate(req.body);
    if (validatingError) {
      return res.status(401).send('Invalid input');
    }
    const existingEmail = await getOneRecipientByEmail(req.body.email);
    if (existingEmail) {
      return res.status(409).send('Email already used');
    }
    const result = await createRecipients(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};

const updateOne = async (req, res) => {
  try {
    const result = await updateRecipients(req.body, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

const deleteOne = async (req, res) => {
  try {
    await deleteRecipients(req.params.id);
    res.status(204).send('Recipient deleted');
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
