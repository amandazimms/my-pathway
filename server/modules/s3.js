// import aws from 'aws-sdk';
const aws = require('aws-sdk')
// import dotenv from 'dotenv';
const dotenv = require('dotenv')

dotenv.config()


const region = 'us-east-2';
const bucketName = 'kyros-exam-objects';
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

function codeCreate(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const generateUploadURL = async () => {
    const imageName = codeCreate(32)

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300
    })

    // console.log('In gernateUploadURL with imageName:', imageName, ' and params:', params, 'and s3:', s3);

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    // console.log('This is after the uploadURL');
    return uploadURL
}

module.exports = {
  generateUploadURL
};