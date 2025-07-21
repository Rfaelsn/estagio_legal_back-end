import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

const configFileInterceptor = {
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      callback(new Error('Only PDF files are allowed'), false);
    } else {
      callback(null, true);
    }
  },
};

const filePipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({ fileType: 'application/pdf' }),
    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
  ],
  fileIsRequired: false,
});

export { configFileInterceptor, filePipe };
