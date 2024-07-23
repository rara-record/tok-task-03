import { diskStorage } from 'multer';
import * as fs from 'fs';

export const createDiskStorage = (path: string) => {
  return diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      cb(null, path);
    },
    filename: function (req, file, cb) {
      console.log(req.body.key);
      cb(null, `${decodeURIComponent(req.body.key.replace('/_media/', ''))}`);
    },
  });
};
