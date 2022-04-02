// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  let img;
  //let input, button, greeting;
  //let w = 80;
  /* const matrix = [ [ 0, -1, 0 ],
                 [ -1, 5, -1 ],
                 [ 0, -1, 0 ] ];  */
const matrix = [ [ 0, 0, 0 ],
              [ 0, 1, 0 ],
              [ 0, 0, 0 ] ]; 

  p.preload = function(){
    img = p.loadImage("/showcase/sketches/flowers2.jpg");
  };

  p.setup = function () {
    p.createCanvas(640, 640);
    img.loadPixels();
    p.pixelDensity(1);
    p.noLoop();
  };

  p.draw = function () {
    p.background(img);
    const matrixsize = 3;

    // Histogram
    var maxRange = 256
    var histogram = new Array(maxRange);
    for (i = 0; i <= maxRange; i++) {
      histogram[i] = 0
    }

    p.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++ ) {
        let c = convolution(x, y, matrix, matrixsize, img);

        let loc = (x + y*img.width) * 4;
        let red = p.pixels[loc] = p.red(c);
        let green = p.pixels[loc + 1] = p.green(c);
        let blue = p.pixels[loc + 2] = p.blue(c);
        let alpha = p.pixels[loc + 3] = p.alpha(c);
        let luma = 0.299*red + 0.587*green + 0.114*blue // Convert to grey scale

        b = p.int(luma);
        histogram[b]++
      }
    }
    p.updatePixels();

    p.stroke(0,213,255)
    p.push()
    p.translate(10,0)
    for (x = 0; x <= maxRange; x++) {
      index = histogram[x];

      y1=p.int(p.map(index, 0, p.max(histogram), p.height, p.height-200));
      y2 = p.height
      xPos = p.map(x,0,maxRange,0, p.width-20)
      p.line(xPos, y1, xPos, y2);
    }
    p.pop()
  };

  function convolution(x, y, matrix, matrixsize, img) {
    let rtotal = 0.0;
    let gtotal = 0.0;
    let btotal = 0.0;
    const offset = p.floor(matrixsize / 2);
    for (let i = 0; i < matrixsize; i++){
      for (let j = 0; j < matrixsize; j++){
        
        const xloc = (x + i - offset);
        const yloc = (y + j - offset);
        let loc = (xloc + img.width * yloc) * 4;
  
        loc = p.constrain(loc, 0 , img.pixels.length - 1);
  
        rtotal += (img.pixels[loc]) * matrix[i][j];
        gtotal += (img.pixels[loc + 1]) * matrix[i][j];
        btotal += (img.pixels[loc + 2]) * matrix[i][j];
      }
    }
    rtotal = p.constrain(rtotal, 0, 255);
    gtotal = p.constrain(gtotal, 0, 255);
    btotal = p.constrain(btotal, 0, 255);
    
    return p.color(rtotal, gtotal, btotal);
  };
}, "workshopEj4");
  