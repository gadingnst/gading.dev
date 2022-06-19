/* eslint-disable no-constant-condition */
import { CLOUDINARY_CLOUD_NAME } from '@/utils/config';
import cloudinary from './cloudinary';

describe('cloudinary url helper test', () => {
  it(`should return cloudinary path`, () => {
    expect(cloudinary('/media/folder/image.jpg'))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/gading.dev/media/folder/image.jpg`);
  });
  it(`should return cloudinary path with image scaling`, () => {
    expect(cloudinary('/media/folder/image.jpg', { scale: 0.1 }))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_0.1,h_0.1/gading.dev/media/folder/image.jpg`);
  });
  it(`should return cloudinary path with image scaling with blur`, () => {
    expect(cloudinary('/media/folder/image.jpg', { scale: 0.1, placeholder: true }))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:250,c_scale,w_0.1,h_0.1/gading.dev/media/folder/image.jpg`);
  });
  it(`should return cloudinary path with image scaling with blur and stopping play gif image`, () => {
    expect(cloudinary('/media/folder/image.gif', { scale: 0.1, placeholder: true }))
      .toBe(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:250,pg_2,c_scale,w_0.1,h_0.1/gading.dev/media/folder/image.gif`);
  });
  it('should return raw url', () => {
    expect(cloudinary('https://www.google.com/an-image.png'))
      .toBe('https://www.google.com/an-image.png');
  });
  it('should return raw path', () => {
    expect(cloudinary('/another/path/image.png'))
      .toBe('/another/path/image.png');
  });
});
