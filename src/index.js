import QRCode from "qrcode";

import config from "../config.json" assert { type: "json", integrity: "sha384-ABC123" };

const generateQR = async (links) => {
  try {
    const linksArray = Array.isArray(links) ? links : [links];

    const promises = linksArray.map((link, index) =>
      QRCode.toFile(`dist/image-${index + 1}.png`, link, {
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

generateQR(config.links);
