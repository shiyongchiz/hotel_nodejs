const service = require("../service/categoryService");

const create = async (req, res) => {
  try {
    service.create(req, res);
  } catch (e) {
    console.log(e);
  }
};
const getAll = async (req, res) => {
  try {
    service.getAll(req, res);
  } catch (e) {
    console.log(e);
  }
};
const getOne = async (req, res) => {
  try {
    service.getOne(req, res);
  } catch (e) {
    console.log(e);
  }
};

const update = async (req, res) => {
  try {
    service.update(req, res);
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  update,
};
