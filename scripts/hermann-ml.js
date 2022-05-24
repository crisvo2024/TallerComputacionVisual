
new p5((p) => {
  let handpose;
  let video;
  let hands = [];
  let points = [];
  let brush;
  let brushes=[];
  let currentBrush = 2;
  let saveIcon;
  let currentColor = p.color(255,0,0); 
  let brushIcon;
  let paint = true;

  p.preload = function(){
    brushes.push(p.loadModel('/showcase/sketches/Popsicle.obj',true)) ;
    brushes.push(p.loadModel('/showcase/sketches/craneo.OBJ',true));
    brushes.push(p.loadModel('/showcase/sketches/bunny.obj',true)); 
    brush = p.loadModel('/showcase/sketches/brush.stl');
    saveIcon = p.loadImage('/showcase/sketches/save.svg');
    brushIcon = p.loadImage('/showcase/sketches/brush.png');
  }

  p.setup = function () {
    console.log('ml5 version:', ml5.version);
    p.createCanvas(640, 480,p.WEBGL);    
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
    buttons();
  };

  function buttons(){
    let brushButton = p.createButton('');
    brushButton.position(10-p.width , 35-p.height,"relative");
    brushButton.mousePressed(()=>{currentBrush=(currentBrush+1)%3;});
    brushButton.class("customButton");
    brushButton.size(50,50);

    let colorButton = p.createColorPicker('#ff0000');
    colorButton.position(10 , 45-p.height,"relative");
    colorButton.size(50,50);
    colorButton.class("customButton");
    colorButton.input(()=>{currentColor=colorButton.color()});

    let paintButton = p.createButton('');
    paintButton.position(-40 , 84-p.height,"relative");
    paintButton.size(50,50);
    paintButton.class("customButton");
    paintButton.mousePressed(()=>{paint= !paint;});

    let saveButton = p.createButton('');
    saveButton.position(-90 , 144-p.height,"relative");
    saveButton.size(50,50);
    saveButton.class("customButton");
    saveButton.mousePressed(()=>{p.saveJSON(points,'drawing',true)});

    let uploadButton = p.createFileInput(async(file)=>{
        points = file.data
    });
    uploadButton.position(-140 , 194-p.height,"relative");
    uploadButton.size(50,50);
    uploadButton.class("customButton");
  }

  function modelReady() {
    console.log("Model ready!");
  }

  p.draw = function () {
    p.background(0);
    p.orbitControl();
    p.stroke(50,70,30);
    p.grid({dotted:false});
    p.axes();
    p.noStroke();
    for (let i = 0; i < points.length; i += 1){
      p.fill(p.color(points[i].color[0],points[i].color[1],points[i].color[2]));      
      p.push();
        p.translate(points[i].position.x, points[i].position.y,points[i].position.z);
        p.scale(0.05,-0.05,0.05);  
        p.ambientLight(60);
        let locX = p.mouseX - p.width / 2;
        let locY = p.mouseY - p.height / 2;
        let light = p.treeLocation(p.createVector(-locX,locY,4),{ from: 'SCREEN', to: 'WORLD'});
        p.pointLight(255, 255, 255, light.x, light.y, light.z);
        p.specularMaterial(p.color(points[i].color[0],points[i].color[1],points[i].color[2]));
        p.shininess(50);
        p.model(brushes[points[i].brush]);
      p.pop();
    }
    drawKeypoints();
    
    interfaz();
  };

  function interfaz(){

    p.fill(currentColor);
    p.push();
      let trans = p.treeLocation(p.createVector(35,35,0.45),{ from: 'SCREEN', to: 'WORLD'});
      p.translate(trans.x,trans.y,trans.z);
      pointLight = p.treeLocation(p.createVector(320,240,2),{ from: 'SCREEN', to: 'WORLD'});
      p.pointLight(255, 255, 255, pointLight.x, pointLight.y, pointLight.z);  
      p.scale(0.03,-0.03,0.03)
      p.ambientLight(60);
      p.specularMaterial(currentColor);
      p.shininess(50);
      p.model(brushes[currentBrush]);
    p.pop();
    p.beginHUD();
      p.noFill()
      p.stroke(currentColor);
      p.strokeWeight(4);
      p.rect(10,10,50,50);
      if(paint){
        p.image(brushIcon,10,130,50,50);
      }
      p.rect(10,130,50,50);

      p.rect(10,190,50,50);
      p.rect(10,250,50,50);
      p.push();
        p.translate(12,190);
        p.fill(currentColor)
        drawDownload();
      p.pop();
      p.push();
        p.translate(11,250);
        p.fill(currentColor)
        drawUpload();
      p.pop();
      
      p.fill(currentColor);
      p.rect(10,70,50,50);
      p.translate(p.width,0,0);
      p.scale(-1.0,1.0);
      p.image(video, 0, 7*(p.height/8), p.width/8, p.height/8);
    p.endHUD();  
  }

  function drawKeypoints() {
    for (let i = 0; i < hands.length; i += 1) {
      const finger = hands[i].annotations.indexFinger[hands[i].annotations.indexFinger.length-1];
      let vec = p.createVector(finger[0],finger[1],(finger[2]-60)/(-160-60));
      let point =p.treeLocation(vec, { from: 'SCREEN', to: 'WORLD'})
      p.push();
      p.translate(point.x, point.y,point.z);
      p.scale(0.5,-0.5);
      pointLight = p.treeLocation(p.createVector(320,240,2),{ from: 'SCREEN', to: 'WORLD'});
      p.pointLight(255, 255, 255, pointLight.x, pointLight.y, pointLight.z);  
      p.ambientLight(60);
      p.specularMaterial(p.color(88, 50, 50));
      p.shininess(50);
      p.model(brush);
      p.pop();
      if(paint)points.push({position:point,color:currentColor.levels,brush:currentBrush})
    }
    hands = [];
  }
  function drawUpload(){
    p.scale(2);
    p.noStroke();
    p.beginShape();
    p.vertex(19,13);
    p.vertex(19,18);
    p.bezierVertex(19,18.55,18.55,19,18,19);
    p.vertex(6,19);
    p.bezierVertex(5.45,19,5,18.55,5,18);
    p.vertex(5,13);
    p.bezierVertex(5,12.45,4.55,12,4,12);
    p.bezierVertex(3.45,12,3,12.45,3,13);
    p.vertex(3,19);
    p.bezierVertex(3,20.1,3.9,21,5,21);
    p.vertex(19,21);
    p.bezierVertex(20.1,21,21,20.1,21,19);
    p.vertex(21,13);
    p.bezierVertex(21,12.45,20.55,12,20,12);
    p.bezierVertex(19.45,12,19,12.45,19,13);
    p.endShape();
    p.beginShape();
    p.vertex(10.980663,7.0934721);
    p.vertex(9.1006632,8.973472);
    p.bezierVertex(8.710663199999999,9.363472,8.0806632,9.363472,7.6906631999999995,8.973472);
    p.bezierVertex(7.3006632,8.583471999999999,7.3006632,7.953472199999999,7.6906631999999995,7.5634722);
    p.vertex(11.280663,3.9734722);
    p.bezierVertex(11.670663000000001,3.5834721999999997,12.300663,3.5834721999999997,12.690663,3.9734722);
    p.vertex(16.280663,7.5634722);
    p.bezierVertex(16.670663,7.953472199999999,16.670663,8.583472,16.280663,8.973472);
    p.bezierVertex(15.890663,9.363472,15.260663000000001,9.363472,14.870663,8.973472);
    p.vertex(12.980663,7.0934721);
    p.vertex(12.980663,15.763472);
    p.bezierVertex(12.980663,16.313472,12.530663,16.763472,11.980663,16.763472);
    p.bezierVertex(11.430663,16.763472,10.980663,16.313472,10.980663,15.763472);
    p.vertex(10.980663,7.0934721);
    p.endShape();
  }
  function drawDownload(){
    p.scale(2);
    p.noStroke();
    p.beginShape();
    p.vertex(19,13);
    p.vertex(19,18);
    p.bezierVertex(19,18.55,18.55,19,18,19);
    p.vertex(6,19);
    p.bezierVertex(5.45,19,5,18.55,5,18);
    p.vertex(5,13);
    p.bezierVertex(5,12.45,4.55,12,4,12);
    p.bezierVertex(3.45,12,3,12.45,3,13);
    p.vertex(3,19);
    p.bezierVertex(3,20.1,3.9,21,5,21);
    p.vertex(19,21);
    p.bezierVertex(20.1,21,21,20.1,21,19);
    p.vertex(21,13);
    p.bezierVertex(21,12.45,20.55,12,20,12);
    p.bezierVertex(19.45,12,19,12.45,19,13);
    p.endShape();
    p.beginShape();
    p.vertex(12.81862,13.824091);
    p.vertex(14.698619999999998,11.944091);
    p.bezierVertex(15.088619999999999,11.554091,15.718619999999998,11.554091,16.10862,11.944091);
    p.bezierVertex(16.49862,12.334091,16.49862,12.964091,16.10862,13.354091);
    p.vertex(12.518619999999999,16.944091);
    p.bezierVertex(12.128619999999998,17.334091,11.498619999999999,17.334091,11.108619999999998,16.944091);
    p.vertex(7.518620099999998,13.354091);
    p.bezierVertex(7.128620099999998,12.964091,7.128620099999998,12.334091,7.518620099999998,11.944091);
    p.bezierVertex(7.908620099999998,11.554091,8.538620099999997,11.554091,8.928620099999998,11.944091);
    p.vertex(10.818619999999997,13.824091);
    p.vertex(10.818619999999997,5.1540905);
    p.bezierVertex(10.818619999999997,4.6040905,11.268619999999997,4.1540905,11.818619999999997,4.1540905);
    p.bezierVertex(12.368619999999998,4.1540905,12.818619999999997,4.6040905,12.818619999999997,5.1540905);
    p.vertex(12.81862,13.824091);
    p.endShape();
  }
}, "hermann-ml");
