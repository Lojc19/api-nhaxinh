const Review = require("../models/review.model");
const Product = require("../models/product.model");

const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register createCate 
const createReview = asyncHandler(async (req) => {
    try {
        const { _id } = req.user;
        const { star, productID, comment } = req.body;
        try {
          const product = await Product.findOne({_id: productID});
          console.log(product._id)
          let alreadyRated = await Review.find({userID: _id, productID: productID});
          if (alreadyRated.length != 0) {
            throw new Error("Bạn đã đánh giá sản phẩm này rồi")
          } else {
            const review = await Review.create({
              star: star,
              comment: comment,
              productID: product._id,
              userID: req.user._id,
            })
          }
          const getallReview = await Review.find({productID: productID});
          let totalReview = getallReview.length;
          let ratingsum = 0;
          for (let i = 0; i < getallReview.length; i++) {
            ratingsum = ratingsum + getallReview[i].star;
          }
          let actualRating = ratingsum / totalReview;
          let finalproduct = await Product.findByIdAndUpdate(
            productID,
            {
              totalrating: actualRating,
            },
            { new: true }
          );
          return
        } catch (error) {
          throw new Error(error);
        }
    } catch (error) {
        throw new Error(error);
    }
});
  
const getReviewDetail = asyncHandler(async (req) => {
  try {
    const {_id} = req.params;
    const listReview = await Review.findOne({_id: _id}, {
      star: 1,
      comment: 1,
      createdAt: 1,
      enable: 1
    }).sort({createdAt: -1}).populate({path: "userID", select:'firstname lastname'});
    return listReview
  }
  catch(error) {
    throw new Error(error);
  }
});

const getAllReview = asyncHandler(async (req, res) => {
  try {
    const listReview = await Review.find({}, {
      star: 1,
      comment: 1,
      createdAt: 1,
      enable: 1
    }).sort({createdAt: -1}).populate({path: "userID", select:'firstname lastname'});
    return listReview
  }
  catch(error) {
    throw new Error(error);
  }
});
  
const getReviewByProductID = asyncHandler(async (req) => {
  try {
    const { _id } = req.params;
    const listReview = await Review.find({productID: _id, enable: true}, {
      star: 1,
      comment: 1,
      createdAt: 1,
    }).sort({createdAt: -1}).populate({path: "userID", select:'firstname lastname'});
    return listReview
  }
  catch(error) {
    throw new Error(error);
  }
});

const updateReview = asyncHandler(async (req) => {
  try {
    const { _id } = req.params;
    await Review.findOneAndUpdate({_id: _id}, {
      enable: req.body?.enable,
    }, 
    {
      new: true,
    });
    return
  }
  catch(error) {
    throw new Error(error);
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    let review = await Review.findOne({_id: _id})
    await Review.findOneAndDelete({_id});

    const getallReview = await Review.find({productID: review.productID});
    let totalReview = getallReview.length;
    let ratingsum = 0;
    for (let i = 0; i < getallReview.length; i++) {
      ratingsum = ratingsum + getallReview[i].star;
    }
    let actualRating = ratingsum / totalReview;
    if(totalReview == 0)
    {
      actualRating = 0;
    }
    let finalproduct = await Product.findByIdAndUpdate(
      review.productID,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    return
  }
  catch(error) {
    throw new Error(error);
  }
});


module.exports = {
    createReview,
    getReviewDetail,
    getAllReview,
    getReviewByProductID,
    updateReview,
    deleteReview
};