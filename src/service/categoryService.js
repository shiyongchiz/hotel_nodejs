const format = require("string-format");
// const { verifyToken } = require("../middleware/JWTAction");
const db = require("../models");
const { returnSuccess, returnFail } = require("../utils/helperFn");
const { RETURNCODE } = require("../constants/code");
const AppError = require("../utils/errorHandle/appError");
const { COMMON_MESSAGES } = require("../constants/commonMessage");

const getOne = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      throw new AppError(
        format(COMMON_MESSAGES.INVALID, categoryId),
        RETURNCODE.INVALID
      );
    }
    const CategoryFetch = await db.Category.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!CategoryFetch) {
      throw new AppError(
        format(COMMON_MESSAGES.NOT_FOUND, categoryId),
        RETURNCODE.NOT_FOUND
      );
    }
    return returnSuccess(req, res, COMMON_MESSAGES.SUCCESS, CategoryFetch);
  } catch (error) {
    return returnFail(req, res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const CategoryFetch = await db.Category.findAll();
    if (!CategoryFetch) {
      throw new AppError(
        format(COMMON_MESSAGES.ERROR, CategoryFetch),
        RETURNCODE.ERROR
      );
    }
    return returnSuccess(req, res, COMMON_MESSAGES.SUCCESS, CategoryFetch);
  } catch (error) {
    return returnFail(req, res, error);
  }
};

const create = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      throw new AppError(
        format(COMMON_MESSAGES.INVALID, categoryName),
        RETURNCODE.INVALID
      );
    }
    const CategoryFetch = await db.Category.findOne({
      where: {
        categoryName,
      },
    });
    if (CategoryFetch) {
      throw new AppError(
        format(COMMON_MESSAGES.EXISTED, categoryName),
        RETURNCODE.EXISTED
      );
    }
    const newCategory = await db.Category.create({
      categoryName,
    });
    return returnSuccess(req, res, COMMON_MESSAGES.SUCCESS, newCategory);
  } catch (error) {
    return returnFail(req, res, error);
  }
};

const update = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    if (!categoryId || !categoryName) {
      throw new AppError(
        format(COMMON_MESSAGES.INVALID, categoryId),
        RETURNCODE.INVALID
      );
    }
    const CategoryFetch = await db.Category.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!CategoryFetch) {
      throw new AppError(
        format(COMMON_MESSAGES.NOT_FOUND, categoryId),
        RETURNCODE.NOT_FOUND
      );
    }
    const updateCategory = await db.Category.update(
      { categoryName },
      {
        where: {
          id: categoryId,
        },
      }
    );
    return returnSuccess(req, res, COMMON_MESSAGES.SUCCESS, updateCategory);
  } catch (error) {
    return returnFail(req, res, error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};
