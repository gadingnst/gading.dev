/* eslint-disable no-console */

import { readdir } from 'fs/promises';
import Path from 'path';
import imgExts from 'image-extensions';
import CloudinaryInstance from 'cloudinary';
import ConcurrentManager from 'concurrent-manager';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from './config';

const Cloudinary = CloudinaryInstance.v2;
Cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const rootDir = process.cwd();
const mediaDir = Path.resolve(rootDir, 'public', 'media');
const imgExtensions = new Set(imgExts);

/**
 * Read all files in a directory deeply
 * @param dir - directory to be read
 * @see https://stackoverflow.com/a/45130990
 */
export async function* getFiles(dir: string): any {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = Path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

/**
 * Check if a file is an image
 * @param path - image path to be checked
 * @returns {boolean} - true if the path is an image
 */
export const isImage = (path: string): boolean =>
  imgExtensions.has(Path.extname(path).slice(1).toLowerCase());

/**
 * Sync media folder to Cloudinary
 * @returns {Promise<void>}
 */
async function syncMedia(): Promise<void> {
  console.log('> Syncing `media` files...');

  // setup queue for uploading with 7 concurrent uploads
  const concurrent = new ConcurrentManager({ concurrent: 7 });

  concurrent.onQueueSettled((data) => {
    console.log(`Queue ${data.id}:`, data);
  });

  try {
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
        concurrent.queue(async() => {
          const response = await Cloudinary.uploader.upload(file, {
            public_id: name,
            folder: `gading.dev/${folderName}`,
            overwrite: false
          });
          return response.public_id;
        });
      }
    }
    await concurrent.run();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

syncMedia();
