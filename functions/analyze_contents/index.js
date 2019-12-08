'use strict';

const storage = require('@google-cloud/storage');
const pubsub = require('@google-cloud/pubsub');
const vision = require('@google-cloud/vision');
const bigquery = require('@google-cloud/bigquery');
const Buffer = require('safe-buffer').Buffer;

exports.analyzeContents = async (data, context, callback) => {
  const object = data;
  console.log(`File ${object.name} uploaded.`);
  const jsonData = Buffer.from(object, 'base64').toString();
  var jsonObj = JSON.parse(jsonData);
  console.log(`Received name: ${jsonObj.name} and bucket: ${jsonObj.bucket} and contentType: ${jsonObj.contentType}`);

  const file = storage.bucket(object.bucket).file(object.name);
  const filePath = `gs://${object.bucket}/${object.name}`;

  try {
    const [result] = await vision.safeSearchDetection(filePath);
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

  callback();
};
