const Product = require("../models/Product");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { STATUS_CODES } = require("http");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Upload Image on our local server
const uploadProductImageLoacally = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No file Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload a image");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Image size is greate than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({
    image: {
      src: `/uploads/${productImage.name}`,
    },
  });
};

const uploadProductImageToCloudinary = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "07-IMAGE-UPLOAD",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  return res
    .status(STATUS_CODES.OK)
    .json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImageToCloudinary };
