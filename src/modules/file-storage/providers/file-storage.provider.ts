import { FileType } from '@/modules/file/domain/entities/file.entity';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FileStorageProvider {
  private controllerUrl = '/file';
  private baseUrl = process.env.FILE_API_URL;

  constructor() {}

  async uploadPdfFile(
    pdfFileBuffer: Uint8Array,
    fileType: FileType,
  ): Promise<string> {
    try {
      const pdfBlob = new Blob([new Uint8Array(pdfFileBuffer)], {
        type: 'application/pdf',
      });

      const formData = new FormData();
      formData.append('file', pdfBlob);
      formData.append('fileType', fileType);

      const response = await axios.post(
        `${this.baseUrl}${this.controllerUrl}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao fazer upload do PDF: ${error.message}`);
    }
  }

  async deletePdfFile(termCommitmentFileId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.baseUrl}${this.controllerUrl}/delete/term/${termCommitmentFileId}`,
      );
    } catch (error) {
      throw new Error(`Erro ao fazer deletar PDF: ${error.message}`);
    }
  }

  async downloadPdfFile(downloadFileDto: {
    filePathId: string;
    fileType: FileType;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}${this.controllerUrl}/download`,
        {
          filePathId: downloadFileDto.filePathId,
          fileType: downloadFileDto.fileType,
        },
        { responseType: 'stream' },
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao realizar o download do PDF: ${error.response.message}`,
      );
    }
  }
}
