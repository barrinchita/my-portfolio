import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import SftpClient from "ssh2-sftp-client";

dotenv.config();

const upload = multer({ dest: "./tempUploads" });

const sftpConfig = {
  host: process.env.VPS_HOST,
  username: process.env.VPS_USER,
  password: process.env.VPS_PASS,
};

// const REMOTE_IMAGE_DIR = "/home/guru/repos/portfolioImages";
const REMOTE_IMAGE_DIR = process.env.REMOTE_IMAGE_DIR;
const PUBLIC_URL_BASE = process.env.PUBLIC_URL_BASE;

const uploadProjectImgs = [
  upload.single("image"),
  async (req, res) => {
    console.log("getting request")
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const localFilePath = req.file.path;
    const remoteFilePath = `${REMOTE_IMAGE_DIR}/${req.file.originalname}`;

    const sftp = new SftpClient();

    try {
      await sftp.connect(sftpConfig);

      // Upload local file to remote VPS directory
      await sftp.put(localFilePath, remoteFilePath);

      // Clean up local temp file
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting temp file:", unlinkError);
      }

      // Respond with public image URL
      const imageUrl = `${PUBLIC_URL_BASE}/${req.file.originalname}`;
      res.json({ message: "image uploaded successfully", status: true, imageUrl });
    } catch (err) {
      console.error("SFTP error:", err.message);
      res.status(500).json({ message: "Failed to upload to VPS", status: false });
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting temp file:", unlinkError);
      }
    } finally {
      await sftp.end().catch(err => console.error("Error closing SFTP:", err));
    }
  },
];

export default uploadProjectImgs;
