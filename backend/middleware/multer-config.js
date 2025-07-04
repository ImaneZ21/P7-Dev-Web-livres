const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Configuration du dossier temporaire pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage }).single("image");

//Permet d'upload et de convertir en webp
const processImage = (req, res, next) => {
  upload(req, res, async () => {
    if (!req.file) {
      return next();
    }
    const inputPath = req.file.path;
    const name = path.parse(req.file.originalname).name.split(" ").join("_");
    const outputFileName = `${name}_${Date.now()}.webp`;
    const outputPath = path.join("images", outputFileName);

    try {
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

      fs.unlinkSync(inputPath);

      req.file.filename = outputFileName;

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la conversion de l'image" });
    }
  });
};

module.exports = processImage;
