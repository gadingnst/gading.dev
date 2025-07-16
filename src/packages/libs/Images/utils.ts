export type SizeParams = {
  width?: string|number;
  height?: string|number;
};

export const DEFAULT_IMAGE_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export function calculateSize(size: string|number|undefined, { width, height }: SizeParams) {
  return {
    width: width || size || '',
    height: height || size || ''
  };
}
