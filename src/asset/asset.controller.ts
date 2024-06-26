import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }

  @Delete('delete/:filename')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  deleteFile(@Param('filename') filename: string) {
    const filePath = join(__dirname, '../../../', 'uploads', filename);

    if (existsSync(filePath)) {
      unlinkSync(filePath);

      return { message: 'File deleted successfully!' };
    } else {
      return { message: 'File not found!', statusCode: 404 };
    }
  }
}
