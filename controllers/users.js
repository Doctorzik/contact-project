const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const validator = require("../validator");

const getAllUsers = async (req, res) => {
  // # swagger.tags = ["Users"];

  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingleUser = async (req, res) => {
  // # swagger.tags = ["Users"];

  // validate the objectid
  if (ObjectId.isValid(req.params.id) === false) {
    return res.status(400).json("invalid Object Id");
  }
   
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userId });

  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createUser = async (req, res) => {
  // # swagger.tags = ["Users"];
  const { error, value } = validator.validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(value);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};
const updateUser = async (req, res) => {


  // # swagger.tags = ["Users"];

   // validate the objectid
   if (ObjectId.isValid(req.params.id) === false) {

    return res.status(400).json("invalid Object Id");
  }

  const { error, value } = validator.validateUser(req.body);
    if(error){

      return res.status(400).json(error.details)
    }

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, value);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while creating the user.");
  }
};

const deleteUser = async (req, res) => {
  // # swagger.tags = ["Users"];
  // validate the objectid
  if (ObjectId.isValid(req.params.id) === false) {

    return res.status(400).json("invalid Object Id");
  }
  
  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || " Some error occured while deleting the user.");
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
