import { Injectable } from '@nestjs/common';
import { writeFile, writeFileSync } from 'fs';

@Injectable()
export class FileService {
  async handleFileUpload(file: Express.Multer.File) {
    // Here you can add custom logic for the uploaded file
    // For example, save the file to a specific location
    const uploadPath = `./uploads/${file.originalname}`;

    try {
      writeFileSync(uploadPath, file.buffer);
      return {
        message: 'File uploaded successfully!',
        filename: file.originalname,
      };
    } catch (error) {
      console.log(error);

      throw new Error('File upload failed');
    }
  }
}
