import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dc7k2xf2a',
      api_key: '269423258987649',
      api_secret: 'mYka2QoJ_pL6aFzKAPnP1hzyux8',
    });
  },
};
