import { readdir } from 'fs/promises';
import { resolve, extname } from 'path';
import imgExts from 'image-extensions';

const imgExtensions = new Set(imgExts);

/**
 * Read all files in a directory deeply
 * @param dir - directory to be read
 * @see https://stackoverflow.com/a/45130990
 */
export async function* getFiles(dir: string): any {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
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
  imgExtensions.has(extname(path).slice(1).toLowerCase());
