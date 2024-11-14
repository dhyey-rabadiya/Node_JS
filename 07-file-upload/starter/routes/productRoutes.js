const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");
const {
  uploadProductImageToCloudinary,
} = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImageToCloudinary);

module.exports = router;
