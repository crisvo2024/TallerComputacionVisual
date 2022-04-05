// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.strokeWeight(10); // medium weight lines
    p.smooth(); // antialias lines
    p.noLoop();
  };

  p.draw = function () {
    p.background(0);
    p.stroke(255);

    var step = 50;
    //vertical lines
    for (var x = step; x < p.width; x = x + step) {
      p.line(x, 0, x, p.height);
    }

    //horizontal lines
    for (var y = step; y < p.height; y = y + step) {
      p.line(0, y, p.width, y);
    }
  };
}, "hermann");
