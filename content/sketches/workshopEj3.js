// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
    p.setup = function () {
      p.createCanvas(400, 400);
      p.strokeWeight(3); // medium weight lines
      p.smooth(); // antialias lines
      p.noLoop();
    };
  
    p.draw = function () {
      p.background(0);
       // dark grey colour for lines
  
      var step = 25;
      //vertical lines
      for (var x = step; x < p.width; x = x + step) {
        if(x%2===0){
          p.stroke(255, 251, 145);
        }else{
          p.stroke(158,158,62);
        }
        p.line(x, 0, x, p.height);
      }
  
      //horizontal lines
      for (var y = step; y < p.height; y = y + step) {
        p.stroke(p.lerpColor(p.color(255, 251, 145),p.color(158,0,62),(p.height-y)/p.height));
        p.line(0, y, p.width, y);
      }
  
      // Circles
      p.ellipseMode(p.CENTER);
      // p.stroke(255, 255, 255); // white circles
      for (var i = step; i < p.width - 5; i = i + step) {
        for (var j = step; j < p.height - 15; j = j + step) {
          p.stroke(p.lerpColor(p.color(206, 222, 162), p.color(124,163,224), (p.width-i)/p.width));
          p.strokeWeight(6);
          p.point(i, j);
          p.strokeWeight(3);
        }
      }
    };
  }, "workshopEj3");
  