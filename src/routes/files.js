const express = require("express");
const router = express.Router();
const { upload, listFiles, deleteFile , shareFile } = require("../controller/filesController");

// Protected routes for file operations
router.get("/", listFiles);
router.post("/upload", upload);
router.delete("/delete/:id", deleteFile);
router.post("/:id/share", shareFile);

module.exports = router;
