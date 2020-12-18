'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.uploadByBuffer = void 0;
const bucketName = 'tyur-bot';
const uploadByBuffer = (storage, data, fileName, callback) => {
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
exports.uploadByBuffer = uploadByBuffer;
const getMimeTypeByFileName = (filename) => {
  const ext = filename.split('.').pop();
  let mime_type = '';
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
//# sourceMappingURL=storage.js.map
