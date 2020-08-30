import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const maxSizeMB = 3;
const uploads = multer({
  storage: multerStorage,
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
  fileFilter: fileFilterImage,
});

function fileFilterImage(req, file, cb) {
  const type = file.mimetype;
  const typeArray = type.split('/');
  if (typeArray[0] == 'image') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export default uploads;
