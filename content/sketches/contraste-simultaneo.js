// took from here: https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/scintillating_grid.js

new p5((p) => {
  p.setup = function () {
    p.createCanvas(448,224);
    p.noStroke();
  };

  p.draw = function () {
    p.background(226,226,226)
    p.fill(27,27,27)
    p.rect(0,0,224,224)
    p.fill(59,59,59)
    p.rect(98,98,28,28)
    p.rect(350,196,28,28)
    p.fill(119,119,119)
    p.rect(322,98,28,28)
    p.rect(322,196,28,28)
  };
}, "contraste-simultaneo");
