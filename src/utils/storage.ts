import { Storage } from '@google-cloud/storage';
const bucketName = 'tyur-bot';

const uploadByBuffer = (
  storage: Storage,
  data: Buffer,
  fileName: string,
  callback: any
) => {
  const file = storage.bucket(bucketName).file(`file/${fileName}`);
  const mime_type = getMimeTypeByFileName(fileName);
  const options = {
    metadata: {
      contentType: mime_type,
    },

    resumable: false,
  };
  file.save(data, options, (err) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(`https://storage.googleapis.com/${bucketName}/file/${fileName}`);
    }
  });
};

const getMimeTypeByFileName = (filename: string): string => {
  const ext = filename.split('.').pop();
  let mime_type: string = '';
  if (ext === 'png') {
    mime_type = 'image/png';
  } else if (ext === 'jpg' || ext === 'jpeg') {
    mime_type = 'image/jpeg';
  } else if (ext === 'mp3') {
    mime_type = 'audio/mpeg';
  } else if (ext === 'gif') {
    mime_type = 'image/gif';
  } else if (ext === 'ogg') {
    mime_type = 'audio/ogg';
  }
  return mime_type;
};

export { uploadByBuffer };
