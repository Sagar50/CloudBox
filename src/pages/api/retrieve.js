// Import required AWS SDK clients and commands for Node.js.
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
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

    const results = await s3Client.send(new ListObjectsCommand({
        Bucket: process.env.BUCKET_NAME
      }));
    const links = []
    for (const object of results.Contents) {
        let link = new Object();
        link["name"] = object.Key; 
        link["link"] = "https://s3.us-east-005.backblazeb2.com/" + process.env.BUCKET_NAME + "/" + object.Key;
        link["size"] = object.Size;
        link["lastModified"] = object.LastModified;
        links.push(link);
    }
    return res.status(200).send(links);
};