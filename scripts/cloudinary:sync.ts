/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

require('dotenv').config();

import Path from 'path';
import CloudinaryInstance from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from '../src/utils/config';
import { getFiles, isImage } from '../src/server/files';
import PromiseQueue from '../src/utils/lib/PromiseQueue';

const Cloudinary = CloudinaryInstance.v2;
Cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const rootDir = process.cwd();
const mediaDir = Path.resolve(rootDir, 'public', 'media');

async function syncMedia() {
  console.log('> Syncing `media` files...');

  // setup queue for uploading with 7 concurrent uploads
  const queue = new PromiseQueue({ concurrent: 7 });

  queue.onQueueSettled((data) => {
    console.log(data);
  });

  console.log('> Deleting `media` folder in Cloudinary...');
  await Cloudinary.api.delete_resources_by_prefix('gading.dev/media/');
  console.log('> Uploading all files in local `media` folder to Cloudinary.');
  for await (const file of getFiles(mediaDir)) {
    const pathToUpload = Path.join('media', file.replace(mediaDir, ''));
    const fileName = Path.basename(pathToUpload);
    const folderName = Path.dirname(pathToUpload);
    const extension = Path.extname(fileName);
    const name = fileName.slice(0, -extension.length);
    if (isImage(pathToUpload)) {
      queue.add(async() => {
        process.stdout.write('.');
        const response = await Cloudinary.uploader.upload(file, {
          public_id: name,
          folder: `gading.dev/${folderName}`,
          overwrite: false
        });
        return response.public_id;
      });
    }
  }
  await queue.run();
}

syncMedia();
