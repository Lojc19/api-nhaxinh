const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductCategory,
  getProductRoom,
  searchProduct,
  getAllProductAdmin,
  uploadImageProduct
} = require("../controllers/product.controller");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {uploadCloud} = require("../../config/cloudinary");

const router = express.Router();

router.post("/create-product", authMiddleware, isAdmin, uploadCloud.array('images', 5), createProduct);

router.get("/product-detail/:_id", getaProduct);
router.get("/category/:id", getProductCategory);
router.get("/room/:id", getProductRoom);

router.put("/updateProduct/:_id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/getAllProduct", getAllProduct);

router.get("/admin/getAll",authMiddleware, isAdmin, getAllProductAdmin);

router.get("/search/:s", searchProduct);

router.post("/uploadImage/:_id", uploadImageProduct);

module.exports = router;