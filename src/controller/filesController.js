const db = require("../configuration/connection");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const filesRepository = require("../repositories/filesDetailsRepository")

// Configure multer for file uploads
const upload = multer({
  dest: "src/uploads/", 
  limits: { fileSize: 1 * 1024 * 1024 * 1024 }, 
});

exports.upload = [
  upload.single("file"),
  async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    try {
      const publicUrl = process.env.PUBLIC_URL+file.filename;
      await db.query(
        "INSERT INTO files (title, description, file_path, file_type, file_size, user_id, public_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, description, file.path, file.mimetype, file.size, req.user.id, publicUrl]
      );
      res.status(201).json({ message: "File uploaded successfully", publicUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload file" });
    }
  },
];

exports.listFiles = async (req, res) => {
  try {
    const files = await filesRepository.getAllfilesUser(req.user.id)
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

exports.deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await filesRepository.deleteFileUser(id,req.user.id)

    if (file.length === 0) return res.status(404).json({ error: "File not found" });

    await db.query("DELETE FROM files WHERE id = ?", [id]);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete file" });
  }
};

exports.shareFile = async (req, res) => {
  const { id } = req.params;
  try {
    const [file] = await db.query("SELECT * FROM files WHERE id = ? AND user_id = ?", [
      id,
      req.user.id,
    ]);

    if (file.length === 0) return res.status(404).json({ error: "File not found" });

    const tinyUrl = `http://localhost:3000/public/${shortid.generate()}`;
    await db.query("UPDATE files SET public_url = ? WHERE id = ?", [tinyUrl, id]);

    res.json({ message: "File shared successfully", tinyUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to share file" });
  }
};
