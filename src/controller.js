const express = require("express");
const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

const router = express.Router();

router.post("/describe", async (req, res) => {
  const KEY = process.env.KEY;
  const ENDPOINT = process.env.ENDPOINT;

  // Create a new Client
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": KEY } }),
    ENDPOINT
  );

  if (!req.body.imageUrl) {
    return res.send("Image url is not set! Please provide an image!");
  }

  try {
    // Describe and Image Url
    const descUrl = req.body.imageUrl;
    const caption = (await computerVisionClient.describeImage(descUrl))
      .captions[0];

    res.send(
      `This maybe ${caption.text} (confidence ${caption.confidence.toFixed(2)})`
    );
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
});

module.exports = router;
