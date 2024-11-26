import multer from "multer";



//! upload multile file to s3 aws using all promises


const storage = multer.memoryStorage();  

// filter to only take images files 
const fileFilter = (req, file, cb) => {
  // if multer file type mimetype is === to image  then save file
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    // else if multer file type !== to image file then do not save file
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
};
// Configure multer for file uploads
const upload = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 1024 * 1024 * 50, files: 1 } // 5MB and only takes 1 file
});

// Specify 'file' as the field name for the uploaded file and limit the upload to 2 files
const uploadFiles = upload.array('file');



//! error handler from multer error 
const multerErrorHandler = (upload) => (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB' });
      } else if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ message: 'Too many files uploaded. Only 1 file is allowed' });
      } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ message: 'Only images are allowed, file must be an image type' });
      }
    }
    next();
  });
};

export {
  uploadFiles,
  multerErrorHandler
}