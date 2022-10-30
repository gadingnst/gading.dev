import { CLOUDINARY_CLOUD_NAME } from '@/utils/config';

export interface Options {
  scale?: number;
  placeholder?: boolean;
}

/**
 * get the cloudinary url
 * @param path - path to file
 * @returns {string} - image url
 */
function cloudinary(path: string, opts?: Options): string {
  const { scale, placeholder = false } = opts || {};
  const isOnMedia = path.startsWith('/media/');
  if (isOnMedia) {
    const gifHandler = path.endsWith('.gif') ? ',pg_2,' : ',';
    const placeholderHandler = placeholder ? `e_blur:250${gifHandler}` : '';
    const scaling = scale ? `${placeholderHandler}c_scale,w_${scale},h_${scale}/` : '';
    const basePath =
      `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${scaling}gading.dev${path}`;
    return basePath;
  }
  return path;
}

export default cloudinary;
