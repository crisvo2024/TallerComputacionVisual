// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  let handpose;
  let video;
  let hands = [];
  let points = [];
  p.setup = function () {
    console.log('ml5 version:', ml5.version);
    p.createCanvas(640, 480);
    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    handpose = ml5.handpose(video, modelReady);

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
    handpose.on("hand", results => {
      hands = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();
    
  };
  function modelReady() {
    console.log("Model ready!");
  }

  p.draw = function () {
    p.image(video, 0, 0, p.width, p.height);
    drawKeypoints();
    for (let i = 0; i < points.length; i += 1){
      p.fill(255, 0, 0);
      p.noStroke();
      p.ellipse(points[i][0], points[i][1], 10, 10);
    }
  };
  function drawKeypoints() {
    for (let i = 0; i < hands.length; i += 1) {
      const hand = hands[i];
      points.push(hand.annotations.indexFinger[hand.annotations.indexFinger.length-1])
      p.fill(0, 255, 0);
      // p.noStroke();
      
      // for (let j = 0; j < hand.annotations.indexFinger.length; j += 1) {
      //   const keypoint = hand.annotations.indexFinger[j];
        
      //   // p.ellipse(keypoint[0], keypoint[1], 10, 10);
      //   p.vertex(keypoint[0], keypoint[1]);
      // }
      p.stroke(51)
      p.line(hand.annotations.indexFinger[0][0], hand.annotations.indexFinger[0][1],hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][0], hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][1]);
      
      
    }
  }
}, "hermann-ml");
