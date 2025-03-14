const express=require("express");
const router=express.Router({ mergeParams: true });
const Listing=require("../models/listing");
const Review=require("../models/review");
const wrapAsync=require("../utils/wrapAsync");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware");
const reviewControlloer=require("../controllers/reviews")



//Post Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControlloer.createReview));
//delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControlloer.destroyReview))

module.exports=router;
