# **Taller Rasterización**

En este taller se estudió la técnica denominada **anti-aliasing** con la cual se busca disminuir la distorción en imágenes de alta resolución al ser presentadas en una resolución inferior.

# Anti-aliasing (AA)

### **1. Introducción**

Un problema básico al realizar renderización es que si amplía la imagen del triángulo que se ha renderizado entonces se evidencia que los bordes del triángulo no son regulares, es decir, se puede observar pequeños "escalones" a lo largo del triángulo como se muestra en la siguiente figura.

![Aliasing en una imagen renderizada.](/showcase/sketches/aliasing.png "Aliasing (AA)")

A estos escalones que se mencionan se les conoce usualmente con la palabra *jaggies*. Estos bordes dentados son básicamente el resultado del hecho de que el triángulo se descompone en píxeles ya que con el proceso de rasterización lo que se hace es descomponer una superficie continua como lo es el triángulo en elementos discretos que vienen siendo los píxeles. La solución propuesta para este problema se denomina anti-aliasing (también denotado *AA*) que consiste en dividir el píxel en subpíxeles y aplicar la prueba a cada subpíxel para ver si este se esncuentra o no dentro del triángulo. Aunque cada subpíxel no viene siendo más que otro escalón este proceso permite capturar los bordes con más precisión.

### **2. Revisión bibliográfica**

Retomando la idea propuesta en la sección anterior en la cual se cogían submuestras de cada píxel lo que se hace entonces para *"suavizar"* estos bordes es determinar el color final del píxel como la suma del color de todos los subpíxeles dividida por el número total de subpíxeles. A modo de ejemplificar este proceso consideremos un triángulo de color negro con fondo blanco y dividimos cada píxel del triángulo rasterizado en 8 subpíxeles. Al aplicar el anti-aliasing sobre un determinado píxel vemos que solo 5 de sus 8 subpíxeles se encuentrán dentro del triángulo entonces el color final (en RGB) del píxel quedaría:

{{< katex display >}}
\frac{255 + 255 + 255 + 0 + 0 + 0 + 0 + 0}{8} = \frac{765}{8} = 95.625
{{< /katex >}}

Este color corresponde a un gris oscuro. De esta manera se deja a un lado una transición *"binaria"* entre el borde del triángulo y el fondo para producir una transición más gradual con el fin de disminuir visualmente el efecto de los bordes escalonados.

Con el propósito de dar un fundamento teórico general del proceso de rasterización y anti-alising se hará una breve explicación de las coordenadas baricéntricas:

#### **2.1 Coordenadas baricéntricas**

Un ***triángulo*** es un polígono con 3 vértices *v0*, *v1*, *v2* y 3 aristas *v0v1*, *v1v2*, *v2v0*. Un triángulo degenerado es aquel en el que los tres vértices son colineales, es decir, todos caen sobre la misma línea (o incluso pueden ser todos el mismo punto). En 2D un triángulo divide el plano en dos regiones: la interior, que es finita, y la exterior, que no lo es. Ambas están separadas por el límite de los triángulos, que consiste en las tres aristas. Para rasterizar un triángulo, básicamente sólo tenemos que consultar un montón de puntos, que suelen corresponder directamente a la cuadrícula de píxeles o estar dispuestos en algún otro patrón regular, y averiguar si están dentro o no. Además de lo anterior se tiene también que los triángulos son siempre convexos: para dos puntos cualesquiera dentro del triángulo, la línea que los une está también totalmente dentro del triángulo.

![Triángulo con vértices especificados.](/showcase/sketches/tri1.webp "Triángulo")

Consideranto la arista *v0v1* de la imagen anterior vemos que esta línea divide el plano en dos mitades: un lado *"izquierdo"* y un lado *"derecho"*. No obstante, si el borde resulta ser horizontal entonces ¿cuál de las dos mitades es la "izquierda" si están apiladas verticalmente?. Por ello se hace necesario expresarlo todo en relación con la arista y no con la imagen de tal manera que e recorre el triángulo por la arista desde *v0* hacia *v1*. Con esto, se refiere a todo lo que está a la izquierda (mirando hacia v1) como el semiespacio *"positivo"*, y a todo lo que está a la derecha como el semiespacio *"negativo"*. Por último, los puntos que caen sobre la línea no pertenecen a ninguno de los dos semiespacios.

Ahora bien, se introduce el concepto del ***determinante*** de una matriz dados 3 puntos como:


{{< katex display >}}
Orient2D(a, b, c) =
\begin{vmatrix}
a_{x} & b_{x} & c_{x}\\
a_{y} & b_{y} & c_{y}\\
1 & 1 & 1
\end{vmatrix} =
\begin{vmatrix}
b_{x} - a_{x} & c_{x} - a_{x} \\
b_{y} - a_{y} & c_{y} - a_{y}
\end{vmatrix}
{{< /katex >}}

De esta manera, si esta expresión es positiva, c se encuentra a la izquierda de la arista dirigida *ab* (es decir, el triángulo *abc* se enrolla en sentido contrario a las agujas del reloj). Así que, al calcular *Orient2D(v0, v1, v2)* esto debería indicar si el triángulo está enrollado en sentido contrario a las agujas del reloj (es decir, si *v2* está a la izquierda de la arista orientada *v0v1*) o no. La expresión anterior nos dice que debemos calcular el siguiente determinante:

{{< katex display >}}
Orient2D(v_{0}, v_{1}, v_{2}) =
\begin{vmatrix}
v_{1x} - v_{0x} & v_{2x} - v_{0x} \\ 
v_{1y} - v_{0y} & v_{2y} - v_{0y}
\end{vmatrix}
{{< /katex >}}

Y esto debería ser igual al ***área con signo del paralelogramo*** con aristas *v0v1* y *v0v2* como se muestra a continuación:

![Paralelogramo formado por 2 vectores.](/showcase/sketches/tri_area1.webp "Paralelogramo")

Ahora bien, si observamos la imagen tenemos que el paralelogramo tiene el doble de área que el triángulo lo cual nos da la fórmula estándar del determinante para el ***área del triángulo***:

{{< katex display >}}
TriArea(v_{0}, v_{1}, v_{2}) = \frac{1}{2}
\begin{vmatrix}
v_{1x} - v_{0x} & v_{2x} - v_{0x} \\ 
v_{1y} - v_{0y} & v_{2y} - v_{0y}
\end{vmatrix}
{{< /katex >}}

Ahora, para averiguar en qué lado de una arista se encuentra un punto vamos a elegir un punto arbitrario *p* y ver cómo se relaciona con la arista *v0v1* de tal manera que la expresión del determinante quedaría:

{{< katex display >}}
\begin{vmatrix}
v_{1x} - v_{0x} & p_{x} - v_{0x} \\ 
v_{1y} - v_{0y} & p_{y} - v_{0y}
\end{vmatrix} = (v_{1x} - v_{0x})(p_{y} - v_{0y}) - (v_{1y} - v_{0y})(p_{x} - v_{0x})
{{< /katex >}}

Y reordenando términos tenemos:

{{< katex display >}}
F_{01}(p) = (v_{0y} - v_{1y})p_{x} + (v_{1x} - v_{0x})p_{y} + (v_{0x}v_{1y} - v_{0y}v_{1x})\\
F_{12}(p) = (v_{1y} - v_{2y})p_{x} + (v_{2x} - v_{1x})p_{y} + (v_{1x}v_{2y} - v_{1y}v_{2x})\\
F_{20}(p) = (v_{2y} - v_{0y})p_{x} + (v_{0x} - v_{2x})p_{y} + (v_{2x}v_{0y} - v_{2y}v_{0x})
{{< /katex >}}

A estas funciones se les denomina ***función de borde*** (o *edge function* en inglés) para los borded *v0v1*, *v1v2* y *v2v0* respectivamente, y de esta manera si las tres son positivas, *p* está dentro del triángulo, suponiendo que el triángulo está enrollado en sentido contrario a las agujas del reloj.

Y es este hecho con el cual se trabaja para realizar la rasterización de una imagen y por consiguiente también se usa para el proceso de anti-aliasing.

### **3. Métodos**

Para llevar a cabo este ejercicio se llevó a cabo en primer lugar una revisión teórica de cada uno de los conceptos que envuelven la temática del proceso de anti-aliasing (AA) en la rasterización de imágenes. De esta manera se investigaron distintas fuentes de información debidamente citadas de las cuales se extrajeron ideas generales acerca de conceptos clave como la fundamentación teórica de las coordenas baricéntricas y el proceso de anti-aliasing aplicado en imágenes.

Finalmente se desarrolló un programa a partir de un ejemplo de rasterización de un triángulo desarrollado por el profesor ***Jean Pierre Charalambos Hernandez*** (vease los recursos citados para ver el ejemplo original) de tal manera que fue modificado y adaptado para poder aplicar anti-aliasing sobre un triángulo ya rasterizado.

### **4. Resultados**

A partir del estudio llevado a cabo se realizó el siguiente programa con el fin de visualizar el efecto del anti-aliasing sobre un triángulo rasterizado.

{{< details title="p5 - anti-aliasing code" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
  const ROWS = 100;
  const COLS = 100;
  const LENGTH = 5;
  let quadrille;
  let row0, col0, row1, col1, row2, col2;
  let original_quadrille;

  function setup() {
    createCanvas(COLS * LENGTH, ROWS * LENGTH);
    quadrille = createQuadrille(200, 200);
    quadrille.colorize('red', 'green', 'blue', 'cyan');
  }

  function draw() {
    background('#f7f5f5');
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
  }

  function keyPressed() {
    if (key === 'r') { // Rasterize the triangle
      randomize();
      quadrille.clear();
      quadrille.rasterizeTriangle(row0, col0, row1, col1, row2, col2, colorize_shader, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
      original_quadrille = quadrille.memory2D;
    }

    if (key === 'a') { // Apply anti-aliasing
      applyAA();
    }

    if (key === 's') { // Remove anti-aliasing
      quadrille.memory2D = original_quadrille;
    }

  }

  function colorize_shader({ pattern: mixin }) {
    let rgb = mixin.slice(0, 3);
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
    grid = quadrille.memory2D;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (grid[i][j] != 0) {
          sum = 0;
          for (let k = i-1; k < i + 1; k += 0.0625){
            for (let t = j-1; t < j + 1; t += 0.0625){ // Pixel division: 1024 subpixels
              let coords = barycentric_coords(k, t, row0, col0, row1, col1, row2, col2);
              if (!(coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0)) {
                sum += 1;
              }
            } 
          }
          grid[i][j] = color((sum * 255)/256);
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
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="AA" width="525" height="525" lib1="/showcase/scripts/p5.quadrille.js">}}
  const ROWS = 100;
  const COLS = 100;
  const LENGTH = 5;
  let quadrille;
  let row0, col0, row1, col1, row2, col2;
  let original_quadrille;

  function setup() {
    createCanvas(COLS * LENGTH, ROWS * LENGTH);
    quadrille = createQuadrille(200, 200);
    quadrille.colorize('red', 'green', 'blue', 'cyan');
  }

  function draw() {
    background('#f7f5f5');
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
  }

  function keyPressed() {
    if (key === 'r') { // Rasterize the triangle
      randomize();
      quadrille.clear();
      quadrille.rasterizeTriangle(row0, col0, row1, col1, row2, col2, colorize_shader, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
      original_quadrille = quadrille.memory2D;
    }

    if (key === 'a') { // Apply anti-aliasing
      applyAA();
    }

    if (key === 's') { // Remove anti-aliasing
      quadrille.memory2D = original_quadrille;
    }

  }

  function colorize_shader({ pattern: mixin }) {
    let rgb = mixin.slice(0, 3);
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
    grid = quadrille.memory2D;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (grid[i][j] != 0) {
          sum = 0;
          for (let k = i-1; k < i + 1; k += 0.0625){
            for (let t = j-1; t < j + 1; t += 0.0625){ // Pixel division: 1024 subpixels
              let coords = barycentric_coords(k, t, row0, col0, row1, col1, row2, col2);
              if (!(coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0)) {
                sum += 1;
              }
            } 
          }
          grid[i][j] = color((sum * 255)/256);
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

Partiendo de los resultados obtenidos tenemos que se puede evidenciar un *suavizado* en los bordes de cada triángulo generado dependiendo de qué fracción de los píxeles de los bordes estén por dentro y qué fracción estén por fuera. Por otra parte, y partiendo del hecho de que se realizó una subdivisión de cada píxel en 256 subpíxeles se evidencia que el proceso de rasterización que se lleva a cabo para determinar el promedio del color del píxel se hace de manera rápida debido a que el cálculo de las funciones de borde para cada subpíxel no significa una carga computacional grande.

### **6. Conclusión**

1. El anti-aliasing es un proceso de mucha utilidad y aplicabilidad por ejemplo en el contexto de los videojuegos ya que provee de un algorítmo eficiente con el cual dar un efecto de suavizado de las figuras y de esta manera el usuario puede tener una visualización de los gráficos mucho más agradable.

![Efecto del antialiasing.](/showcase/sketches/anti-aliasing-effect-.jpg "Efecto AA")

2. 

### **7. Referencias**

- [Rasterization: a Practical Implementation](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-practical-implementation)
- [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/n)
- [Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing)
- [Aliasing & Anti-aliasing](https://helpx.adobe.com/photoshop-elements/key-concepts/aliasing-anti-aliasing.html#:~:text=Anti-aliasing%20is%20the%20smoothing,make%20the%20edges%20appear%20smoother.)
- [Raster in p5.quadrille.js](https://github.com/objetos/p5.quadrille.js/blob/main/examples/raster/sketch.js)

