'use strict';

const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const {Firestore} = require('@google-cloud/firestore');

const storage = new Storage();
const firestore = new Firestore();
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
    const [result] = await client.faceDetection(filePath);
    const faces = result.faceAnnotations;
    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joyLikelihood}`);
      console.log(`    Anger: ${face.angerLikelihood}`);
      console.log(`    Sorrow: ${face.sorrowLikelihood}`);
      console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });

    let document = firestore.collection('demo').doc('images');
    let getDoc = document.get()
      .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  } catch (err) {
    console.error(`Failed to analyze ${file.name}.`, err);
    throw err;
  }
};
