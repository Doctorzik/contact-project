const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

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

  user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favorite_color: req.body.favorite_color,
    birthdate: req.body.birthdate,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(user);
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

  const userId = new ObjectId(req.params.id);
  user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favorite_color: req.body.favorite_color,
    birthdate: req.body.birthdate,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, user);
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

  const userId = new ObjectId(req.params.id);
  console.log("me1");
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
