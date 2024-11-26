import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


dotenv.config(); // initialize dotenv configuration

// Function to upload a file to S3 using AWS SDK V3
const s3UploadV3 = async (files) => {
  // instance of S3Client
  const s3 = new S3Client({ region: process.env.AWS_REGION });

  const awsBucketName = process.env.AWS_BUCKET_NAME // aws s3 bucket name 
  // parameters to be passed to aws upload function 
  const params = files.map(file => {
    //sets upload folder to save files dnd  generate unique key for each file with file name from multer 
    const key = `upload/${uuidv4()}-${file.originalname}`;
    // returns parameters for aws upload function
    return {
      Bucket: awsBucketName, // AWS bucket name 
      Key: key, // AWS path to upload files and also the name of the file 
      Body: file.buffer, // multer passes buffer when file is save to memory 
    };

    // returns promise of putObjectCommand


  });

  // awaits all promises to resolve  and Upload all files in parallel
  const result = await Promise.all(
    params.map((param) => S3Client.send(new PutObjectCommand(param)))
  );

  // Generate public URLs for all files
  const urls = params.map((param) => {
    `https://${param.Bucket}.s3.us-west-1.amazonaws.com/${param.Key}`
  });
  return {
    result,
    urls, // returns array of public URLs for all uploaded files
    success: true, // indicates if all files were uploaded successfully

  }

};

export default s3UploadV3;