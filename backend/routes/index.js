const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// Route for handling file upload and data submission
router.post("/submit", fileController.handleSubmission);

module.exports = router;
