'use strict';

const {Storage} = require('@google-cloud/storage');
const pubsub = require('@google-cloud/pubsub');
const vision = require('@google-cloud/vision');
const bigquery = require('@google-cloud/bigquery');
const storage = new Storage();
const client = new vision.ImageAnnotatorClient();

exports.analyzeContents = async (data, context) => {
  const object = data;
  console.log(`File ${object.name} uploaded.`);

  const file = storage.bucket(object.bucket).file(object.name);
  const filePath = `gs://${object.bucket}/${object.name}`;

  const [metadata] = await file.getMetadata()
  console.log(`Received name: ${metadata.name} and bucket: ${metadata.bucket} and contentType: ${metadata.contentType}`);

  if(!metadata.contentType.startsWith("image")){
    console.error(`Failed to analyze ${file.name}. Only image contents accepted. `);
    return;
  }

  try {
    const [result] = await client.safeSearchDetection(filePath);
    const detections = result.safeSearchAnnotation || {};

    if (detections.adult === 'VERY_LIKELY') {
      console.log(`Detected ${file.name} as inappropriate.`);
    } else {
      console.log(`Detected ${file.name} as OK.`);
    }
  } catch (err) {
    console.error(`Failed to analyze ${file.name}.`, err);
    throw err;
  }
};
