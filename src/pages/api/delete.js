// Import required AWS SDK clients and commands for Node.js.
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";



const credential = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
}

const s3Client = new S3Client({
    endpoint: "https://s3.us-east-005.backblazeb2.com",
    region: "us-east-005",
    credentials: credential,
});

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req, res) {

  const fileName = req.query.fileName;
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
  });
  try {
    return response = await s3Client.send(command).then(response => 
        { 
          return res.status(200).send("File deleted successfully");
        }).catch(error =>
        
        { 
          console.log(error);
          return res.status(500).send("Something went wrong");
        });
  } catch (err) {
    console.error(err);
  }
};