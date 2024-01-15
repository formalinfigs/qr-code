const QRCode = require("qrcode");
const fs = require("fs");

const config = require("../config.json");

const generateQR = async ({ links, outputDir, format, margin, color }) => {
  try {
    const linksArray = Array.isArray(links) ? links : [links];

    const promises = linksArray.map(({ url, fileName }) => {
      if (!fileName) return;

      return QRCode.toFile(
        `pictures/${outputDir.trim()}/${fileName}.${format}`,
        url,
        {
          type: format,
          width: 300,
          errorCorrectionLevel: "L",
          margin,
          color,
        }
      );
    });

    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
};

if (!fs.existsSync("pictures")) {
  fs.mkdirSync("pictures");
}

if (!fs.existsSync(`pictures/${config.outputDir.trim()}`)) {
  fs.mkdirSync(`pictures/${config.outputDir.trim()}`);
}

generateQR(config);
