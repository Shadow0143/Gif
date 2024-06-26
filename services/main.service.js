const fs = require('fs');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');
const remixScript = require('../public/Js/remixScript');
// const path = require('path');

 
// const createGif = async function (body) {
//   const canvas = createCanvas(body.width, body.height);
//   const ctx = canvas.getContext('2d');

//   const encoder = new GIFEncoder(body.width, body.height);

//   const outputDir = './output/';
//   const outputPath = path.join(outputDir, 'result.gif');

//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
//   }

//   const writeStream = fs.createWriteStream(outputPath);
//   encoder.createReadStream().pipe(writeStream);

//   encoder.start();
//   encoder.setRepeat(0);
//   // Uncomment & comment out below line for localfile system
//    //encoder.setDelay(10); 
//   encoder.setDelay(body.frame_rate * 1000);
//   encoder.setQuality(10);

  
//   // Uncomment & comment out  below line for localfile system
//   // const imgList = fs.readdirSync('./public/images/');
//   const imgList = body.image;
//   console.log('imgList =======', imgList);

//   try {
//     for (const f of imgList) {
//       // Uncomment & comment out  below line for localfile system 
//       //const image = await loadImage(`./public/images/${f}`);
//       const image = await loadImage(`${f}`);
//       ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
//       encoder.addFrame(ctx);
//     }

//     encoder.finish();
    
//     return { message: 'GIF Generated!' };
//   } catch (error) {
//     console.error('Error creating GIF:', error);
//     throw new Error('Internal Server Error');
//   }
// };



// Convert the gif fileinto base64 and return it.

const createGif = async function (body) {
  const canvas = createCanvas(body.width, body.height);
  const ctx = canvas.getContext('2d');
  const encoder = new GIFEncoder(body.width, body.height);
  const bufferArray = [];
  encoder.createReadStream().on('data', chunk => {
    bufferArray.push(chunk);
  });

  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(body.frame_rate * 1000);
  encoder.setQuality(10);

  const imgList = body.image;

  try {
    for (const f of imgList) {
      const image = await loadImage(`${f}`);
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
      encoder.addFrame(ctx);
    }

    encoder.finish();
    const gifBuffer = Buffer.concat(bufferArray);
    const base64Gif = gifBuffer.toString('base64');
    return { message: 'GIF Generated!', base64Gif };
  } catch (error) {
    console.error('Error creating GIF:', error);
    throw new Error('Internal Server Error');
  }
};


const remixCreate = async function (body) {
  console.log('body',body);
}

module.exports = { 
  createGif,
  remixCreate
 };



