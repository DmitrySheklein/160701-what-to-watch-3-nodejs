import { Request, Response, NextFunction } from 'express';
import mime from 'mime-types';
import { MiddleWareInterface } from '../../types/middleware.interface';
import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements MiddleWareInterface {
  constructor(private uploadDirectory: string, private fieldName: string) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const ext = mime.extension(file.mimetype);
        const fileName = nanoid();
        callback(null, `${fileName}.${ext}`);
      },
    });
    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
