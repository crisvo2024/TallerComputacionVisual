// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  p.setup = function () {
    p.createCanvas(560,322);
    p.background(145,145,145);
    p.noStroke();
  };

  p.draw = function () {
    p.fill(254, 81, 108)
    p.rect(70,70,182,182)
    
    
    p.fill(229, 111, 41)
    p.rect(322,70,182,182)

    p.fill(254, 81, 108)
    p.rect(429,131,14,14)
    p.rect(383,131,14,14)
    p.rect(429,177,14,14)
    p.rect(383,177,14,14)

    p.fill(229, 111, 41)
    p.rect(177,131,14,14)
    p.rect(131,131,14,14)
    p.rect(177,177,14,14)
    p.rect(131,177,14,14)
    
  };
}, "contraste-simultaneo-tono");
