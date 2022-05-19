// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  let handpose;
  let video;
  let hands = [];
  let points = [{position:p.createVector(0,0,0),color:p.color(0,255,0)}];
  let cam;
  let brush;
  let popSicle;
  let craneo;
  let maxz = 0;
  let saveIcon;
  let colors = [p.color(255,0,0),p.color(0,255,0),p.color(0,0,255)]
  let currentColor = 0;
  p.setup = function () {
    console.log('ml5 version:', ml5.version);
    p.createCanvas(640, 480,p.WEBGL);
    // This makes a zoom in the camera without affecting the scale of points
    // cam = p.createCamera();
    // cam.move(0,0,-150)
    
    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    handpose = ml5.handpose(video, {flipHorizontal: true,},modelReady);

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
    handpose.on("hand", results => {
      hands = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();
    brush = p.loadModel('/showcase/sketches/brush2.stl');
    
    popSicle = p.loadModel('/showcase/sketches/Popsicle.obj');
    craneo = p.loadModel('/showcase/sketches/craneo.OBJ');
    saveIcon = p.loadImage('/showcase/sketches/saveIcon.png');
  };
  function modelReady() {
    console.log("Model ready!");
  }

  p.draw = function () {
    p.background(0);
    p.orbitControl();
    // Flips the camera horizontally
    // p.translate(p.width/2,-p.height/2,0);
    // p.scale(-1.0,1.0);
    // shows the video
    // if(p.beginHUD!=undefined){
    //   p.beginHUD();
    //   p.image(video, 0, 0, p.width, p.height);
    //   p.endHUD();
    // }
    
    
    for (let i = 0; i < points.length; i += 1){
      p.fill(points[i].color);
      p.noStroke();
      // p.ellipse(points[i][0], points[i][1], 10, 10);
      p.push();
      p.translate(points[i].position.x, points[i].position.y,points[i].position.z);
      // p.sphere(2);
      p.scale(0.5,-0.5);
      p.model(craneo);
      p.pop();
    }
    drawKeypoints();
    p.scale(1.5,1.5);
    if(p.beginHUD!=undefined){
      p.beginHUD();
      p.rect(10,10,50,50);
      p.rect(10,70,50,50);
      p.rect(10,130,50,50);
      p.rect(10,190,50,50);
      p.image(saveIcon,20,200,30,30)
      p.endHUD();
    }
  };
  function drawKeypoints() {
    for (let i = 0; i < hands.length; i += 1) {
      const hand = hands[i];
      let vec = p.createVector(
        hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][0],
        hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][1],
        (hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][2]+100)/100
        )
        // console.log(vec.x)
      // if(vec.x<80||vec.x>560||vec.y<80||vec.y>400)break;
      let point =p.treeLocation(vec, { from: 'SCREEN', to: 'WORLD'})
      
      p.push();
      p.fill(88, 50, 50);
      p.translate(point.x, point.y,point.z);
      // p.sphere(5);
      p.scale(0.5,-0.5);
      p.model(brush);
      
      p.pop();


      // console.log(vec)
      // console.log(point)
      points.push({position:point,color:colors[currentColor]})
      // points.push(hand.annotations.indexFinger[hand.annotations.indexFinger.length-1])
      p.fill(0, 255, 0);
      p.noStroke();
      
      for (let j = 0; j < hand.landmarks.length; j += 1) {
        const keypoint = hand.landmarks[j];
        maxz = (keypoint[2]+100)/100>maxz?(keypoint[2]+100)/100:maxz;
        let handPoint = p.treeLocation([keypoint[0],keypoint[1],(keypoint[2]+100)/100],{ from: 'SCREEN', to: 'WORLD'});
        // p.push();
        // p.translate(handPoint.x, handPoint.y,handPoint.z);
        // p.sphere(2);
        // // p.model(brush)
        // p.pop();
        
        // p.ellipse(keypoint[0], keypoint[1],10,10);
      }
      console.log(maxz);
      // p.stroke(51);
      // p.strokeWeight(4);
      // p.line(hand.annotations.indexFinger[0][0], hand.annotations.indexFinger[0][1],hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][0], hand.annotations.indexFinger[hand.annotations.indexFinger.length-1][1]);
      
      
    }
    hands = [];
  }
}, "hermann-ml");
