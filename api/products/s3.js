const aws = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-2"; //region the bucket exists in
const bucketName = "nana-soaps-products"; //name of the bucket
const accessKeyId = process.env.S3_ACCESS_KEY; //access key for bucket
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY; //secret access key for bucket

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL(imgName) {
  // const rawBytes = await randomBytes(16);
  // const imageName = rawBytes.toString("hex");
  const imageName = imgName;

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = { generateUploadURL };
