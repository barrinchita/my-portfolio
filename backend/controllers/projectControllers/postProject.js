import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ImagesModel, Project } from "../../schemas/projectSchema.js";
import { CreateProject } from "./createprojects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, "../../../frontend/public/uploads/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed!"
      ),
      false
    );
  }

  cb(null, true);
};

// File upload middleware with size limit
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export const postProject = async (req, res) => {
  console.log("New incoming images");

  try {
    if (req.headers.id) {
      let projectData = req.body;
      let projectId = req.headers.id;
      console.log(projectData);

      CreateProject(req, res, projectId, projectData);
      return
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Ensure req.body.field is an array
    const imagefields = Array.isArray(req.body.field)
      ? req.body.field
      : [req.body.field];

    if (!imagefields.length) {
      return res
        .status(400)
        .json({ message: "Invalid or missing image field data" });
    }

    const participantsImage = [];
    const textImages = [];

    // console.log("Uploaded Files:", req.files);

    req.files.forEach((file, index) => {
      if (imagefields[index] === "textImage") {
        textImages.push({ imageName: file.filename });
      } else {
        participantsImage.push({ participantImage: file.filename });
      }
    });

    const newImages = new ImagesModel({
      participantImage: participantsImage, // Ensure this matches schema
      textImage: textImages,
    });

    const savedImages = await newImages.save();
    return res
      .status(200)
      .json({ message: "Images saved successfully", id: savedImages._id });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
