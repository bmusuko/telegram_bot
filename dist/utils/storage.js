'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.uploadByLink = exports.getMimeTypeByFileName = exports.uploadByBuffer = void 0;
const bucketName = 'tyur-bot';
const request_1 = __importDefault(require('request'));
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
const uploadByLink = (storage, link, fileName, mime_type, callback) => {
  const file = storage.bucket(bucketName).file(`file/${fileName}`);
  request_1.default
    .get(link)
    .pipe(
      file.createWriteStream({
        metadata: {
          contentType: mime_type,
        },
      })
    )
    .on('error', (err) => {
      console.error(err, `error occurred`);
      callback(err);
    })
    .on('finish', () => {
      callback(`https://storage.googleapis.com/tyur-bot/file/${fileName}`);
    });
};
exports.uploadByLink = uploadByLink;
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
exports.getMimeTypeByFileName = getMimeTypeByFileName;
//# sourceMappingURL=storage.js.map
