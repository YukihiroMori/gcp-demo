'use strict';

const storage = require('@google-cloud/storage');
const pubsub = require('@google-cloud/pubsub');
const vision = require('@google-cloud/vision');
const bigquery = require('@google-cloud/bigquery');

exports.analyzeContents = (data, context) => {
  const file = data;
  console.log(`File ${file.name} uploaded.`);
  const jsonData = Buffer.from(data, 'base64').toString();
  var jsonObj = JSON.parse(jsonData);
  console.log(`Received name: ${jsonObj.name} and bucket: ${jsonObj.bucket} and contentType: ${jsonObj.contentType}`);
};
