# **Taller Rasterización**

En este taller se estudió la técnica denominada **anti-aliasing** con la cual se busca disminuir la distorción en imágenes de alta resolución al ser presentadas en una resolución inferior.

# Anti-aliasing (AA)

### **1. Introducción**



### **2. Revisión bibliográfica**


### **3. Métodos**



### **4. Resultados**

<!-- {{< p5-div sketch="/showcase/scripts/anti_aliasing.js" >}} -->
{{< p5-global-iframe id="AA" width="525" height="525" lib1="/showcase/scripts/p5.quadrille.js">}}
    const ROWS = 100;
    const COLS = 100;
    const LENGTH = 5;
    let quadrille;
    let row0, col0, row1, col1, row2, col2;
    let min_row, min_col, max_row, max_col;
    let sub_quadrille;

    function setup() {
      createCanvas(COLS * LENGTH, ROWS * LENGTH);
      quadrille = createQuadrille(100, 100);
      // randomize();
      // highlevel call:
      // quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, [255, 0, 0], [0, 255, 0], [0, 0, 255]);
      // quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, 'red', 'green', 'blue');
      quadrille.colorize('red', 'green', 'blue', 'cyan');
    }

    function draw() {
      background('#f7f5f5');
      drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
      tri();
    }

    function tri() {
      push();
      noStroke();
      // stroke('black');
      // strokeWeight(3);
      noFill();
      triangle(col0 * LENGTH + LENGTH / 2, row0 * LENGTH + LENGTH / 2, col1 * LENGTH + LENGTH / 2, row1 * LENGTH + LENGTH / 2, col2 * LENGTH + LENGTH / 2, row2 * LENGTH + LENGTH / 2);
      pop();
    }

    function keyPressed() {
      randomize();
      if (key === 'r') {
        quadrille.clear();
        // low level call:
        // [r, g, b, x, y]: rgb -> color components; x, y -> 2d normal
        quadrille.rasterizeTriangle(row0, col0, row1, col1, row2, col2, colorize_shader, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
        applyAA();
      }
      
      /*if (key === 's') {
        quadrille.clear();
        quadrille.rasterize(colorize_shader, [255, 0, 0, 7, 4], [0, 255, 0, -1, -10], [0, 0, 255, 5, 8], [255, 255, 0, -1, -10]);
      }*/

      /*if (key === 'a') {
        applyAA();
      }*/

      /*
      if (key === 't') {
        quadrille.clear(5, 5);
        quadrille.fill(6, 6, color('cyan'));
      }
      */
    }

    // pretty similar to what p5.Quadrille.colorizeTriangle does
    function colorize_shader({ pattern: mixin }) {
      let rgb = mixin.slice(0, 3);
      // debug 2d normal
      // console.log(mixin.slice(3));
      // use interpolated color as is
      return color(rgb);
    }

    function randomize() {
      col0 = int(random(0, COLS));
      row0 = int(random(0, ROWS));
      col1 = int(random(0, COLS));
      row1 = int(random(0, ROWS));
      col2 = int(random(0, COLS));
      row2 = int(random(0, ROWS));
    }

    function applyAA() {
      min_row = min(row0, row1, row2);
      max_row = max(row0, row1, row2);
      min_col = min(col0, col1, col2);
      max_col = max(col0, col1, col2);

      grid = quadrille.memory2D;

      /*for (let i = min_row; i <= max_row; i++) {
        for (let j = min_col; j <= max_col; j++) {
          if (grid[i][j] != 0) {
            grid[i][j] = color(255, 204, 0);
          }
        }
      }*/

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (grid[i][j] != 0) {
            sum = 0;
            for (let k = i; k < 1 + i; k += 0.1){
              for (let t = j; t < 1 + j; t += 0.1){
                let coords = barycentric_coords(k, t, row0, col0, row1, col1, row2, col2);
                if (!(coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0)) {
                 sum += 255;
                }
              } 
            }
            //console.log(sum);
            grid[i][j] = color(sum/100);
          }
        }
      }

      quadrille.memory2D = grid;
    }

  function barycentric_coords(row, col, row0, col0, row1, col1, row2, col2) {
    let edges = edge_functions(row, col, row0, col0, row1, col1, row2, col2);
    let area = parallelogram_area(row0, col0, row1, col1, row2, col2);
    return { w0: edges.e12 / area, w1: edges.e20 / area, w2: edges.e01 / area };
  }

  function parallelogram_area(row0, col0, row1, col1, row2, col2) {
    return (col1 - col0) * (row2 - row0) - (col2 - col0) * (row1 - row0);
  }

  function edge_functions(row, col, row0, col0, row1, col1, row2, col2) {
    let e01 = (row0 - row1) * col + (col1 - col0) * row + (col0 * row1 - row0 * col1);
    let e12 = (row1 - row2) * col + (col2 - col1) * row + (col1 * row2 - row1 * col2);
    let e20 = (row2 - row0) * col + (col0 - col2) * row + (col2 * row0 - row2 * col0);
    return { e01, e12, e20 };
  }

{{< /p5-global-iframe >}}

### **5. Discusión**


### **6. Conclusión**

1. La convolución es una operación matématica utilizada en varios campos de estudio (por ejemplo en señales y comunicaciones) y en el procesamiento de imágenes juega un papel importante en distintas implementaciones como filtros en aplicaciones, reconocimiento facial, entre otros.
2. Los histogramas de imágenes son herrmientas útiles para el análisis de tonalidades de los colores ya que permiten evidenciar de manera clara características de la imagen como si existen tonos apagados, sombras o zonas oscuras, si la imagen esta en contraluz, etc.

### **7. Referencias**

- [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
- [Image convolution - Jamie Ludwig - Portland State University](http://web.pdx.edu/~jduh/courses/Archive/geog481w07/Students/Ludwig_ImageConvolution.pdf)
- [El histograma](http://www.thewebfoto.com/2-hacer-fotos/217-el-histograma)
- [Image histogram](https://en.wikipedia.org/wiki/Image_histogram)
- [Applications of Convolution in Image Processing)](https://www.youtube.com/watch?v=BQyMZ0caFbg)
