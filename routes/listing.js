const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const listingController = require("../controllers/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const multer = require('multer')
const { storage } = require("../cloudConfig")
const upload = multer({ storage })


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));

//New route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;