'use strict';

const storage = require('@google-cloud/storage');
const pubsub = require('@google-cloud/pubsub');
const vision = require('@google-cloud/vision');
const bigquery = require('@google-cloud/bigquery');

exports.analyzeContents = (event, context) => {
  const file = data;
  console.log(`File ${file.name} uploaded.`);
  if ((typeof(jsonObj.contentType) === "undefined") || (!jsonObj.contentType)) {
    console.error(`Input request: ${jsonData}`);
    throw new Error('ContentType not provided. Make sure you have a "contentType" property in your request');
  }
  if ((jsonObj.contentType.search(/image/i) == -1)) {
    console.error(`Input request: ${jsonData}`);
    throw new Error('Unsupported ContentType provided. Make sure you upload an image which includes a "contentType" property of image or video in your request');
  }
};
