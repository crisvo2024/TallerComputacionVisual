# **Procedural texturing**

En este taller se estudió la técnica denominada **procedurtal texturing** con la cual se busca generar programáticamente texturas en el shader para mapearlas a figuras

### **1. Introducción**

Para este taller quisimos explorar las diferentes posibilidades que tenía el procedural texturing. Esta técnica para generar texturas en el shader es muy útil dado que es muy eficiente al aprovechar las capacidades de las GPU y permite una mayor flexibilidad al momento de generar escenarios en 3D. Pero al ser generadas por computador, se hace necesario el uso de funciones de ruido, estas funciones de ruido permiten generar la sensación de aleatoriedad, como la que se genera en la naturaleza de los materiales rugosos, permitiendo así la generación de texturas mucho más realistas. Adicionalmente, estas texturas necesitan de diseños que permitan percibir profundidad entre otros rasgos para no verse solo como una imagen pintada en el objeto, para lo cual ya se utilizan modelos de iluminación y de texture mapping combinados con las técnicas de procedural texturing.




### **2. Revisión bibliográfica**

Para empezar con la generación de texturas se realizó una revisión bibliográfica en cuanto a generación de patrones en el shader, posteriormente se exploró la parte de aleatorización de las texturas y finalmente se intentó realizar una revisión de modelos de iluminación.

#### **2.1 Patrones**

Dado que los programas en los shaders siempre se realizan pixel por pixel, sin importar cuánto se repita una forma, el número de cálculos se mantiene constante, esto hace que los shaders sean el lugar ideal para generar patrones.

Para la generación de patrones, se utiliza comúnmente una normalización del espacio, de forma que las coordenadas queden entre 1 y 0, las cuales se pueden dividir fácilmente para generar una cuadrícula, que sea un marco para la generación de los patrones. Las cuadrículas son especialmente útiles a la hora de generar patrones y se han utilizado desde la antigüedad, un ejemplo de esto son los mosaicos en los baños romanos.

En glsl para realizar este proceso se toman las coordenadas de textura y se dividen en la resolución de la pantalla, posteriormente se multiplican estas coordenadas por el tamaño de la cuadrícula que se requiera, de esta forma se pueden utilizar funciones como fract que retorna la parte no entera de un número o mod que saca el módulo de un número en otro número, para empezar a dividir la cuadrícula y generar las formas necesarias. Un ejemplo de esto es el siguiente shader:
```glsl
// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st *= 3.0;      // Scale up the space by 3
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1

    color = vec3(st,0.0);

	gl_FragColor = vec4(color,1.0);
}
```
que genera la siguiente textura:

![Textura generada](/showcase/sketches/cuadricula.png "Textura generada")

Dentro de estas cuadrículas ya podemos empezar a generar nuestros patrones. Uno de estos son los patrones de Offset o de desplazamiento. Para poder generar estos patrones, que son como los de una pared de ladrillos, se hace necesario el identificar si una fila es par o impar para saber si el ladrillo se debe desplazar o no.
```glsl
y = step(1.0,mod(x,2.0));
```
Esta es la forma más eficiente de realizar lo anterior en el shader. Esta línea lo que hace es que aplica el módulo en base 2 para x, de esta forma toma dos cuadros de la cuadrícula generada, y con la función step, diferencia entre estas 2 cual es la par y cual es la impar generando un 0 para cualquier valor menor que 1 y un 1 para todo lo que sea mayor que 1. Se puede notar cómo esto podría realizarse con un condicional y un < pero, al ser step una función del lenguaje, funciona mucho más rápido que este condicional. Es por esto que cada vez que se pueda usar una función como esta, va a ser más óptimo usarla.

#### **2.2 Ruido**

Ya teniendo las bases para generar formas definidas, se hace necesario introducir la aleatoriedad para generar formas más realistas. El primer acercamiento que se hace frente a este tema, utiliza funciones sinusoidales, las multiplica por números muy grandes y extrae la parte fraccionaria de cada número, generando números pseudo-aleatorios. Es necesario notar que como generadoras de números pseudo-aleatorios, estas funciones reciben un número y a partir de este generan el número "aleatorio", sin embargo, ante un mismo número siempre se va a generar la misma salida. Adicionalmente, esta forma de generar números, tiene un problema y es que los números tienden a concentrarse en el centro. Una función que podría utilizarse para generar ruido en 2D es la siguiente:
```glsl
    fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
```
Esta función utiliza el seno del producto punto del vector de coordenadas y un vector aleatorio, multiplicado por un valor igualmente aleatorio y finalmente toma la parte fraccionaria de este número. El resultado de esta función es un ruido como el que se generaba en los televisores antiguos cuando no había señal.

![TV](/showcase/sketches/tv.png "TV")

Aunque esta fórmula aporta aleatoriedad, esta no es ni parecida a la que encontramos normalmente en la naturaleza y los objetos reales, esto se da porque esté aleatorio no guarda ninguna correlación entre sus valores, pero en la naturaleza, la mayoría de los patrones guardan memoria del estado anterior. 

El lograr un ruido más natural, fue el reto al que se enfrentó Ken Perlin en los 80s cuando se enfrentó al reto de generar texturas más realistas para su película Tron. Como resultado ideó dos algoritmos, uno de ellos ganador de un Oscar.

El primer algoritmo llamado “Value Noise”, utiliza una interpolación de la parte entera y la parte fraccionaria del número de entrada para realizar la generación, de esta forma se mantiene la correlación con la parte entera, pero también una parte aleatoria con la no entera. El algoritmo resultante es este:

```glsl
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
```
La función smoothstep nos permite que esta interpolación no sea lineal sino que como lo dice su nombre sea suavizada, ayudando a que la conexión de los valores se vea mucho más natural. Esto también se puede realizar utilizando una fórmula cúbica personalizada como prefieren algunos autores.

No obstante, esta función no fue lo suficientemente buena para Perlin, quien en 1985 ideó otra implementación de este algoritmo, la cual llamó "Gradient Noise". En esta, Perlin averiguar cómo interpolar gradientes aleatorios en vez de valores. Estos gradientes son el resultado de una función aleatoria en 2D que retorna direcciónes en vez de valores simples. El resultado:

```glsl
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
```
Como podemos notar en este caso se utilizó una función cúbica personalizada en vez de smoothstep, para calcular u.

Pero para Perlin esto todavía no fue suficiente, el sabia que podía hacerlo mejor, por lo que en 2001 presentó el "simplex noise". Este mejoraba el algoritmo anterior en los siguientes aspectos:

- Un algoritmo con menor complejidad computacional y menos multiplicaciones.
- Un ruido que escala a dimensiones más altas con menos coste computacional.
- Un ruido sin artefactos direccionales.
- Un ruido con gradientes bien definidos y continuos que puedan calcularse de forma bastante económica.
- Un algoritmo fácil de implementar en hardware.

Para la mejora, el vio que en dos dimensiones el estaba interpolando 4 puntos del cuadrado, así que él pudo notar que para 3 y 4 dimensiones se tenían que interpolar 6 y 16 puntos, de esta forma para N dimensiones 2^n. Por lo que decidió reemplazar la cuadrícula, por un una rejilla simplex de triángulos equiláteros
La forma simplex para N dimesiones es una forma de N+1 esquinas, en otras palabras 1 esquina menos en 2 dimensiones, 4 en 3D y 11en 4D. 

¿Cómo se hace la rejilla simplex? la cuadrícula simplex puede obtenerse subdividiendo las celdas de una cuadrícula regular de 4 esquinas en dos triángulos isósceles y luego distprcionandola hasta que cada triángulo sea equilátero.
```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Some useful functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
float snoise(vec2 v) {

    // Precompute values for skewed triangular grid
    const vec4 C = vec4(0.211324865405187,
                        // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,
                        // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,
                        // -1.0 + 2.0 * C.x
                        0.024390243902439);
                        // 1.0 / 41.0

    // First corner (x0)
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other two corners (x1, x2)
    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    // Do some permutations to avoid
    // truncation effects in permutation
    i = mod289(i);
    vec3 p = permute(
            permute( i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(
                        dot(x0,x0),
                        dot(x1,x1),
                        dot(x2,x2)
                        ), 0.0);

    m = m*m ;
    m = m*m ;

    // Gradients:
    //  41 pts uniformly over a line, mapped onto a diamond
    //  The ring size 17*17 = 289 is close to a multiple
    //      of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt(a0*a0 + h*h);
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

    // Compute final noise value at P
    vec3 g = vec3(0.0);
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
    return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    // Scale the space in order to see the function
    st *= 10.;

    color = vec3(snoise(st)*.5+.5);

    gl_FragColor = vec4(color,1.0);
}
```
### **3. Métodos**

Para llevar a cabo este ejercicio se llevó a cabo en primer lugar una revisión teórica de cada uno de los conceptos que envuelven la temática del proceso de procedural texturing. Para esto se jugo con la posiblidad de generar una textura de una pared de ladrillos desde el shader y darle algo de movimiento a este. Para realizar esto fue necesaria una investigación en cuanto a formas de generar imagenes de ruido para emular la rugocidad de los ladrillos, posteriormente, se implemetaron las diferentes opciones y se le añadio dinamismo al incluir como variable el tiempo, en forma del numero del frame actual, de esta forma se consigue que los ladrillos se empiecen a mover en la figura. Se tuvo la intención de añadir bump mapping para una comparación, pero el tiempo no nos permitio completarlo.
### **4. Resultados**

A partir del estudio llevado a cabo se realizó el siguiente programa con el fin de visualizar el efecto del procedural texturing.

{{< details title="p5 - anti-aliasing code" open=false >}}
```js
{{</* p5-global-iframe id="prod_text" width="430" height="430" lib1="/showcase/scripts/p5.treegl.js">}}
    let pg;
    let truchetShader;

    function preload() {
      // shader adapted from here: https://thebookofshaders.com/09/
      // truchetShader = readShader('brickwall.frag', { matrices: Tree.mvMatrix, varyings: Tree.texcoords2|Tree.normal3|Tree.position3});
      // console.log(parseVertexShader({ matrices: Tree.mvMatrix|Tree.pMatrix|Tree.pmvMatrix, varyings: Tree.texcoords2|Tree.normal3|Tree.position3}))
      truchetShader = loadShader('/showcase/scripts/brickwall.vert', '/showcase/scripts/brickwall.frag');
    }

    function setup() {
      createCanvas(400, 400, WEBGL);
      // create frame buffer object to render the procedural texture
      pg = createGraphics(400, 400, WEBGL);
      textureMode(NORMAL);
      noStroke();
      pg.noStroke();
      // use truchetShader to render onto pg
      pg.shader(truchetShader);
      // emitResolution, see:
      // https://github.com/VisualComputing/p5.treegl#macros
      pg.emitResolution(truchetShader);
      // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      // set pg as texture
      texture(pg);
    }

    function draw() {
      background(33);
      truchetShader.setUniform('u_time', frameCount);
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      orbitControl();
      // cylinder(100, 200);
      sphere(100)
      // cone(100,100);

      // ambientLight(60);
      // let locX = mouseX - width / 2;
      // let locY = mouseY - height / 2;
      // let light = treeLocation(createVector(-locX,-locY,1.5),{ from: 'SCREEN', to: 'WORLD'});
      // pointLight(255, 255, 255, light.x, light.y, light.z);
      // box(100);
    }
    function mouseMoved() {
      // https://p5js.org/reference/#/p5.Shader/setUniform
      // pg.emitMousePosition(truchetShader);
      let locX = mouseX - width / 2;
      let locY = mouseY - height / 2;
      let light = treeLocation(createVector(-locX,-locY,1.5),{ from: 'SCREEN', to: 'EYE'});
      truchetShader.setUniform('light_pos',[light.x,light.y,light.z,1.] );
      // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    } 
    
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="prod_text" width="430" height="430" lib1="/showcase/scripts/p5.treegl.js">}}
    let pg;
    let truchetShader;
    let slider1, slider2;
    let n0 = n1 = n2 = n3 = false;

    function preload() {
      // shader adapted from here: https://thebookofshaders.com/09/
      // truchetShader = readShader('brickwall.frag', { matrices: Tree.mvMatrix, varyings: Tree.texcoords2|Tree.normal3|Tree.position3});
      // console.log(parseVertexShader({ matrices: Tree.mvMatrix|Tree.pMatrix|Tree.pmvMatrix, varyings: Tree.texcoords2|Tree.normal3|Tree.position3}))
      truchetShader = loadShader('/showcase/scripts/brickwall.vert', '/showcase/scripts/brickwall.frag');
    }

    function setup() {
      createCanvas(400, 400, WEBGL);
      // create frame buffer object to render the procedural texture
      pg = createGraphics(400, 400, WEBGL);
      textureMode(NORMAL);
      noStroke();
      pg.noStroke();
      // use truchetShader to render onto pg
      pg.shader(truchetShader);
      // emitResolution, see:
      // https://github.com/VisualComputing/p5.treegl#macros
      pg.emitResolution(truchetShader);
      // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);

      // Sliders
      slider1 = createSlider(10, 100, 10, 10);
      slider1.position(10, 10);

      slider2 = createSlider(0.1, 1, 0.1, 0.1);
      slider2.position(10, 30);

      // Coloring select
      sel1 = createSelect();
      sel1.position(10, 60);
      sel1.option('Original');
      sel1.option('Value Noise');
      sel1.option('Gradient Noise');
      sel1.option('Simplex Noise');
      sel1.changed(changeNoise);

      // set pg as texture
      truchetShader.setUniform('scale', 10.0);
      truchetShader.setUniform('speedFactor', 0.1);
      truchetShader.setUniform('n0', true);
      truchetShader.setUniform('n1', false);
      truchetShader.setUniform('n2', false);
      truchetShader.setUniform('n3', false);
      texture(pg);
    }

    function draw() {
      background(33);
      truchetShader.setUniform('u_time', frameCount);
      truchetShader.setUniform('scale', slider1.value());
      truchetShader.setUniform('speedFactor', slider2.value());
      
      if (n0){
        truchetShader.setUniform('n0', true);
      } else if (n1) {
          truchetShader.setUniform('n1', true);
      } else if(n2){
          truchetShader.setUniform('n2', true);
      } else if(n3){
          truchetShader.setUniform('n3', true);
      }
      
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      orbitControl();
      // cylinder(100, 200);
      sphere(100)
      // cone(100,100);

      // ambientLight(60);
      // let locX = mouseX - width / 2;
      // let locY = mouseY - height / 2;
      // let light = treeLocation(createVector(-locX,-locY,1.5),{ from: 'SCREEN', to: 'WORLD'});
      // pointLight(255, 255, 255, light.x, light.y, light.z);
      // box(100);
    }
    function mouseMoved() {
      // https://p5js.org/reference/#/p5.Shader/setUniform
      // pg.emitMousePosition(truchetShader);
      let locX = mouseX - width / 2;
      let locY = mouseY - height / 2;
      let light = treeLocation(createVector(-locX,-locY,1.5),{ from: 'SCREEN', to: 'EYE'});
      truchetShader.setUniform('light_pos',[light.x,light.y,light.z,1.] );
      // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    } 

    function changeNoise(){
      let selection = sel1.value();
      n0 = n1 = n2 = n3 = false;
      resetUniformsFalse();
      if (selection == 'Original') {
          n0 = true;
      } else if(selection == 'Value Noise'){
          n1 = true;
      } else if(selection == 'Gradient Noise'){
          n2 = true;
      } else if(selection == 'Simplex Noise'){
          n3 = true;
      }
    }

    function resetUniformsFalse(){
        truchetShader.setUniform('n0', false);
        truchetShader.setUniform('n1', false);
        truchetShader.setUniform('n2', false);
        truchetShader.setUniform('n3', false);
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

