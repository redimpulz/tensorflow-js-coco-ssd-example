window.onload = async () => {
  const img = document.querySelector("#img");

  // Load the model.
  const model = await cocoSsd.load();
  // detect objects in the image.
  const predictions = await model.detect(img);
  console.log(predictions);

  const c = document.querySelector("#canvas");
  c.width = img.width;
  c.height = img.height;
  const context = c.getContext("2d");
  context.drawImage(img, 0, 0, img.width, img.height);
  context.font = "10px Arial";

  console.log("number of detections: ", predictions.length);

  for (const p of predictions) {
    if (p.class === "person") {
      context.beginPath();
      context.rect(...p.bbox);
      context.lineWidth = 1;
      context.strokeStyle = "green";
      context.fillStyle = "green";
      context.stroke();
      context.fillText(
        p.score.toFixed(3) + " " + p.class,
        p.bbox[0],
        p.bbox[1] > 10 ? p.bbox[1] - 5 : 10
      );
    }
  }
};
