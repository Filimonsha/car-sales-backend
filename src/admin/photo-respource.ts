// import uploadFeature from '@adminjs/upload';
import uploadFileFeature from '@adminjs/upload';
import { componentLoader } from './component-loader.js'
// import { CreateResourceResult } from '../create-resource-result.type.js'
import { ResourceWithOptions } from 'adminjs';
import { Photo } from 'src/entities/Photo.js';


const localProvider = {
    bucket: 'public/files',
    opts: {
      baseUrl: '/files',
    },
  };
  
// const createPhotoResource = (): CreateResourceResult<typeof Photo> => ({
//   resource: Photo,
//   options: {
//     listProperties: ['id', 's3Key', 'bucket', 'path'],
//   },
//   features: [uploadFeature({
//     componentLoader,
//     provider: { local: { bucket: 'public', opts: {} } },
//     properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
//     validation: { mimeTypes: ['image/png'] },
//   })],
// })

export const photoResource:ResourceWithOptions = {
    resource: Photo,
    options: {
      properties: {
        s3Key: {
          type: 'string',
        },
        bucket: {
          type: 'string',
        },
        mime: {
          type: 'string',
        },
        comment: {
          type: 'textarea',
          isSortable: false,
        },
      },
    },
    features: [
      uploadFileFeature({
        componentLoader, 
        provider: { local: localProvider },
        validation: { mimeTypes: ['image/png'] },
        properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
      }),
    ],
  };

// export default createPhotoResource