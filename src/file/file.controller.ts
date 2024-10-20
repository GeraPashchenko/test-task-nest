import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './storage.config';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor(
      'file', // name of the field being passed
      { storage },
    ),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('massive-file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 500 * 1024 * 1024 },
    }),
  )
  async uploadLargeFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const uploadDir = './uploads';
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    // Generate a unique file name
    const filePath = `${uploadDir}/${Date.now()}-${file.originalname}`;

    try {
      // Create a writable stream for the final destination
      const writeStream = createWriteStream(filePath);

      writeStream.write(file.buffer);

      return new Promise((resolve, reject) => {
        console.log(`Parsing file in progress`);

        writeStream.end(() => {
          console.log('File uploaded successfully');

          resolve({ message: 'File uploaded successfully', path: filePath });
        });

        writeStream.on('error', (error) => {
          reject(
            new HttpException(
              `Upload failed: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });
      });
    } catch (err) {
      console.log(err);

      throw new HttpException(
        `Error uploading file: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
