import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
import * as fs from 'fs';
import { formatBrDate, formatTime } from '@/shared/utils/format-date.util';

@Injectable()
export class GeneratePdfService {
  constructor() {}

  async createTermCommitmentPdf(
    createTermCommitmentDto: any,
  ): Promise<Uint8Array> {
    const templatePath = `dist/src/modules/generate-pdf/infrastructure/templates/term-commitment.template.ejs`;
    const pdfLogoImagePath = `dist/src/modules/generate-pdf/infrastructure/templates/images/logo_pdf_ifpa.png`;
    const backgroundLogoImagePath = `dist/src/modules/generate-pdf/infrastructure/templates/images/brasaooficial.png`;

    const html = await this.renderEjsFile(templatePath, {
      ...createTermCommitmentDto,
      user: {
        ...createTermCommitmentDto.user,
        birthDate: formatBrDate(createTermCommitmentDto.user.birthDate),
      },
      internshipStartDate: formatBrDate(
        createTermCommitmentDto.internshipStartDate,
      ),
      internshipEndDate: formatBrDate(
        createTermCommitmentDto.internshipEndDate,
      ),
      internshipStartTime: formatTime(
        createTermCommitmentDto.internshipStartTime,
      ),
      internshipEndTime: formatTime(createTermCommitmentDto.internshipEndTime),
      pdfLogo: pdfLogoImagePath,
      backgroundLogo: backgroundLogoImagePath,
    });

    const pdf = await this.generatePdf(html);

    return pdf;
  }

  private async renderEjsFile(
    templateFilePath: string,
    templateData: Record<string, any> = {},
  ): Promise<string> {
    try {
      const logoPath = path.resolve(templateData.pdfLogo);
      const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });

      const logoDataUri = `data:image/png;base64,${logoBase64}`;

      const backgroundLogoPath = path.resolve(templateData.backgroundLogo);
      const backgroundLogoBase64 = fs.readFileSync(backgroundLogoPath, {
        encoding: 'base64',
      });

      const backGroundLogoDataUri = `data:image/png;base64,${backgroundLogoBase64}`;

      const htmlTemplate = await ejs.renderFile(templateFilePath, {
        ...templateData,
        pdfLogo: logoDataUri,
        backgroundLogo: backGroundLogoDataUri,
      });

      return htmlTemplate;
    } catch (error) {
      console.error('Falha ao renderizar template EJS', error);
      throw new Error('Template não encontrado ou erro de renderização');
    }
  }

  private async generatePdf(html: string): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath:
        process.env.CHROME_BIN || '/app/.apt/usr/bin/google-chrome-stable',
      headless: true,
    });

    try {
      const page = await browser.newPage();

      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
      });

      await browser.close();
      return pdf;
    } catch (error) {
      console.error(`erro no puppeter ${error}`);
    }
  }
}
