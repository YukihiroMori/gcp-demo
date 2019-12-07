'use strict';

const storage = require('@google-cloud/storage');
const pubsub = require('@google-cloud/pubsub');
const vision = require('@google-cloud/vision');
const bigquery = require('@google-cloud/bigquery');

exports.analyzeContents = (data, context) => {
  const file = data;
  console.log(`File ${file.name} uploaded.`);
  console.log(`File ${file} uploaded.`);
  if (!file.contentType.startsWith('image/')) {
    console.log('This is not an image.');
  }
};
