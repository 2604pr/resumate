const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;

class FileParser {
  async parsePDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`PDF parsing error: ${error.message}`);
    }
  }

  async parseDOCX(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      throw new Error(`DOCX parsing error: ${error.message}`);
    }
  }

  async parseFile(filePath, mimetype) {
    if (mimetype === 'application/pdf') {
      return await this.parsePDF(filePath);
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return await this.parseDOCX(filePath);
    } else {
      throw new Error('Unsupported file type');
    }
  }
}

module.exports = new FileParser();
