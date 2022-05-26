/* eslint-disable no-constant-condition */
import { CLOUDINARY_CLOUD_NAME } from '@/utils/config';
import cloudinary from './cloudinary';

describe('cloudinary url helper test', () => {
  it(`'cloudinary("/media/folder/image.jpg")' should return cloudinary path`, () => {
    expect(cloudinary('/media/folder/image.jpg'))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/gading.dev/media/folder/image.jpg`);
  });
  it(`'cloudinary("/media/folder/image.jpg", 0.1)' should return cloudinary path with image scaling`, () => {
    expect(cloudinary('/media/folder/image.jpg', 0.1))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:500,c_scale,w_0.1,h_0.1/gading.dev/media/folder/image.jpg`);
  });
  it(`'cloudinary("/media/folder/image.gif", 0.1)' should return cloudinary path with image scaling and stopping play gif image`, () => {
    expect(cloudinary('/media/folder/image.gif', 0.1))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:500,c_scale,w_0.1,h_0.1,pg_2/gading.dev/media/folder/image.gif`);
  });
  it('`cloudinary("https://www.google.com/an-image.png")` should return raw url', () => {
    expect(cloudinary('https://www.google.com/an-image.png'))
      .toBe('https://www.google.com/an-image.png');
  });
  it('`cloudinary("/another/path/image.png")` should return raw path', () => {
    expect(cloudinary('/another/path/image.png'))
      .toBe('/another/path/image.png');
  });
});
