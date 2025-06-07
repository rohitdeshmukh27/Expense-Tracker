const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "upload/");
  },
  filename: (req, file, cd) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});

//file filter

const fileFilter = (req, file, cd) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cd(null, true);
  } else {
    cd(new Error("Only .jpeg, .jpg, .png format are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
