// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import formidable from "formidable";


const credential = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
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
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (!files.demo) {
      return res.status(400).send("No file uploaded");
    }
    try {
      return s3Client.send(new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: files.demo.originalFilename,
        Body: fs.createReadStream(files.demo.filepath),
      })).then(response => {
        console.log("File uploaded successfully");
        return res.status(200).send("File uploaded successfully");
        }).catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error", err);
      return res.status(500).send("Something went wrong");
    }
  });
}



