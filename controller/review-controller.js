const review = require("../models/review-model");
const product = require("../models/product-model");
const { BadRequest, NotFound } = require("../customError");
const { StatusCodes } = require("http-status-codes");
const { checkPermissioins } = require("../utils");

const createReview = async (req, res) => {
  const { product: productID } = req.body;
  const productExist = await product.findById(productID);

  if (!productExist) {
    throw new NotFound("no product with that id");
  }

  const alreadyReviwed = await review.findOne({
    product: productID,
    user: req.user.userID,
  });

  if (alreadyReviwed) {
    throw new BadRequest("user has already reviewd this product");
  }

  req.body.user = req.user.userID;
  const data = await review.create(req.body);
  res.status(StatusCodes.OK).json({ data: data });
};

const getAllReview = async (req, res) => {
  const data = await review
    .find({})
    .populate({ path: "user", select: "username" });
  res.status(StatusCodes.OK).json({ data: data });
};

const getSingleReview = async (req, res) => {
  const { id: productID } = req.params;
  const data = await review.findById(productID);
  res.status(StatusCodes.OK).json({ data: data });
};

const updateReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const reviewExist = await review.findById(reviewID);
  if (!reviewExist) {
    throw new NotFound("no product with that id");
  }

  checkPermissioins(req.user, reviewExist.user);
  const { title, rating, comment } = req.body;
  reviewExist.title = title;
  reviewExist.rating = rating;
  reviewExist.comment = comment;

  reviewExist.save();

  res.status(StatusCodes.OK).json({ success: true });
};

const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const reviewExist = await review.findById(reviewID);
  if (!reviewExist) {
    throw new NotFound("no product with that id");
  }
  checkPermissioins(req.user, reviewExist.user);
  reviewExist.remove();
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
