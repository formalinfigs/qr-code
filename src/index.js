const QRCode = require("qrcode");
const fs = require("fs");

const config = require("../config.json");

const generateQR = async ({ links, outputDir }) => {
  try {
    const linksArray = Array.isArray(links) ? links : [links];

    const promises = linksArray.map((link, index) =>
      QRCode.toFile(`${outputDir}/image-${index + 1}.png`, link, {
        type: "png",
        width: 256,
        errorCorrectionLevel: "L",
      })
    );

    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
};

if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir);
}

generateQR(config);
