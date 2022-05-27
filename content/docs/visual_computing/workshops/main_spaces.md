# **Taller Main Spaces**




### **1. Introducción**

En este taller se exploraron las posibilidades de las transformaciones espaciales para la producción de piezas en 3D, especialmente se hace uso de estas transformaciónes al proyectar los resultados de la pieza 3D en la pantalla, así como a partir de movimientos y gestos realizados sobre la pantalla modificar la pieza 3D al agregar objetos en su mundo, esto sin contar con las transformaciónes intermedias para lograr algunos efectos en la pantalla como la iluminación. 

### **2. Revisión bibliográfica**

Dentro de las transformaciones espaciales que podemos encontrar diferentes conjuntos de transformaciones que nos pueden ayudar a producir todo tipo de figuras en un espacio 3D. 

#### Transformaciones lineales

El primero de estos tipos es transformaciones lineales, estas comprenden la rotación, cambio de escala, proyexión ortogonal, y reflexión.

Para realizar una transformación lineal hay dos caminos, transformar el espacio de coordenadas en el que se esta dibujando o transformar el objeto. Cualquiera de estas opciones es equivalente a la otra en el sentido opuesto, por ejemplo rotar un objeto 20° en el sentido de las manecillas del reloj es equivalente a rotar el espacio de coordenadas del objeto 20° en el sentido contrario a las manecillas del reloj. De igual forma, una combinación de transformaciones lineales a un objeto es equivalente las mismas operaciónes en sentido y orden contrario. Para poder realizar estas transformaciones se utilizan operaciónes matriciales sobre las coordenadas.

Las matrices que nos permiten realizar estas transfotmaciones son:
##### Rotación sobre un eje aleatorio
En este se realiza una rotación  en un angulo {{< katex >}}\theta{{< /katex >}} sobre un eje definido por un vector unitario {{< katex >}}n{{< /katex >}}, esto permite realizar la rotación en cualquier sentido incluido el de cualquiera de los ejes x, y o z
{{< katex display >}}
R(n,\theta) =
\begin{bmatrix}
p'\\
q'\\
r'
\end{bmatrix}\\
R(n,\theta) =
\begin{bmatrix}
n_x^2(1-cos \theta) + cos\theta & n_x n_y(1-cos \theta) + n_z sin \theta & n_x n_z(1-cos \theta) + n_y sin \theta\\
n_x n_y(1-cos \theta) - n_z sin\theta & n_y^2(1-cos \theta) + cos \theta & n_y n_z(1-cos \theta) + n_x sin \theta\\
n_x n_z(1-cos \theta) + n_y sin\theta & n_y n_z(1-cos \theta) - n_x sin \theta & n_z^2(1-cos \theta) + cos \theta\\
\end{bmatrix}
{{< /katex >}}

##### Escalamiento en una dirección aleatoria
En este se realiza un escalado por un factor {{< katex >}}k{{< /katex >}} en un eje definido por un vector unitario {{< katex >}}n{{< /katex >}}, esto permite realizar el escalamiento en cualquier sentido incluido el de cualquiera de los ejes x, y o z
{{< katex display >}}
S(n,k) =
\begin{bmatrix}
p'\\
q'\\
r'
\end{bmatrix}=
\begin{bmatrix}
1+(k-1)n_x^2 & (k-1)n_x n_y & (k-1)n_x n_z\\
(k-1)n_x n_y & 1+(k-1)n_y^2 & (k-1)n_y n_z\\
(k-1)n_x n_z & (k-1)n_y n_z & 1+(k-1)n_z^2\\
\end{bmatrix}
{{< /katex >}}

##### Proyección y reflexión sobre en un plano aleatorio
Estas operaciones son derivadas del escalamiento, en el caso de la proyección se realiza escalando por un factor de 0 en la dirección en la que se quiere proyectar la figura y en el caso de la reflexión se aplica un factor de -1, por simplicidad no se presenta las matrices de estas transformación, que se derivan de la matriz de escalamiento remplazando k por 0 o por -1 respectivamente.

finalmente todas estas transformaciones se pueden concatenar multiplicando sus matrices respectivas en el orden en el que se desean aplicar las transformaciones. 

#### Transformaciones Afines

Todas las transformaciones vistas anteriormente se realizan con relación a un eje que pasa por el origen, sin emabrgo, esto no es siempre lo que se desea. Las transformaciones afines introducen la traslación, siendo definidas como una transformación lineal seguida por una traslación, es por esto que se considera a las transformaciones lineales como un subconjunto de las transformaciones afines. Cualquier transformación {{< katex >}} v' = vM + b {{< /katex >}} es una transformación afin.

Para poder realizar cualquier traslación ya una matriz de 3x3 no es suficiente, es por eso que se utiliza una notación de matrices extendidas de 4x4 equivalentes a las matrices ya vistas, pero con una conluma y fila añadidas, en un eje llamado comunmente w esto se ve reprecentado en la siguiente operación:

{{< katex display >}}
\begin{bmatrix}
x & y & z & 1 
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
\Delta x & \Delta y & \Delta z & 1
\end{bmatrix} = 
\begin{bmatrix}
x + \Delta x & y + \Delta y & z + \Delta z & 1
\end{bmatrix}
{{< /katex >}}

Esto nos muestra exactamente como se aplica una traslación sobre la matriz de 4x4. 
En transformación afin, en donde se realiza una transformación linearl R y una traslación T

{{< katex display >}}
R = 
\begin{bmatrix}
r_11 & r_12 & r_13 & 0\\ 
r_21 & r_22 & r_23 & 0\\ 
r_31 & r_32 & r_33 & 0\\ 
0 & 0 & 0 & 1\\
\end{bmatrix} 
T = 
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
\Delta x & \Delta y & \Delta z & 1
\end{bmatrix} 
{{< /katex >}}
Es posible calcular un punto {{< katex >}} v'{{< /katex >}} a partir del punto {{< katex >}} v{{< /katex >}} de la siguiente forma:
{{< katex display>}} 
v' = vRT 
{{< /katex >}}


Lo cual finalmente nos permite definir la matriz de una transformación afin como:
{{< katex display>}} 
\begin{bmatrix}
r_11 & r_12 & r_13 & 0\\ 
r_21 & r_22 & r_23 & 0\\ 
r_31 & r_32 & r_33 & 0\\ 
\Delta x & \Delta y & \Delta z & 1
\end{bmatrix} 
{{< /katex >}}
Ya con esta herramienta es posible realizar la cualquier tipo de rotación, reflexión, proyección o escalamiento sobre un eje que no pase por el origen, permitiendo una infinidad de operaciones en el espacio incluidas las necesarías para visualizar y manipular desde distintos puntos una escena, ya sea desde un ojo o camara, en el mundo o en sus espacios intermedios.




### **3. Métodos**

Con la intención de mostrar la manipulación de objetos en 3D se implementa el pincel 3D, aprovechando la libreria de inteligencia artificial ML5.js, la cual posee un modelo preentrenado que permite hacer el reconocimiento de manos con base en los fotogramas de un video, este modelo ubica 20 puntos de la mano en un sistema de coordenadas con relación al video, pero que tambien incluye un eje Z con una aproximación de la profundidad.Para el pincel se decidio que el usuario pinte con la punta del dedo indice. Este pincel 3D dispone de 5 botonoes, uno para intercambiar el pincel que se usa, el cual se puede ser un conejo, una calavera o una paleta. El segundo boton permirte cambiar el color con el que se pinta. El tercer boton permite habilitar o deshabilitar el pincel. Finalmente los ultimos dos botones permiten exportar e importar respectivamente un dibujo en un archivo JSON. Adicionalmetente y como ayuda para el usuario se muestra en la esquina inferior la imagen de la camara y en la pantalla se muestra en todo momento la posición del pincel.
{{< details title="3D brush markdown" open=false >}}
```js
  
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

```
{{< /details >}}
{{< p5-div sketch="/showcase/scripts/hermann-ml.js">}}


### **5. Discusión**

Es interesante todas las transformaciones que se dan detras de este pincel, se pueden ver cambios de espacios entre la pantalla y el mundo pero ademas se pueden ver las tranformaciones más simples en diferentes partes, un ejemplo es un reflejo de la camara para que el usuario pueda dibujar mejor, o las traslaciones usadas para el posicionamiento de los botones y demas objetos de la interfz, de la misma manera se ven efectos más complejos cuendo entramos a manipular la camara, causando rotaciones combinadas con traslaciones y escalamiento en diferentes ejes. Otra de las transformaciones interesantres es la que se realiza al posicionar la luz con respecto al mouse para cambiar la iluminación de lo dibujado y poder denotar bien la forma de los diferentes pinceles. 

Una extensión de este proyecto se podría dar mejorando el modelo de machine learning que se usa para la detección de la mano, esto con el objetivo de permitir el reconocimiento de dos manos o mejorar la precisión de la aproximación del eje Z la cual no es muy estable y es propensa a errores. tambien se podría permitir al usuario cargar sus propios pinceles y controlar la interfaz con solo gestos, sin embargo, esto ultimo estaría atado a mejorar el modelo incluyento la capasidad de detectar las 2 manos y diferenciarlas, o de un cambio en la forma de captar los movimientos y gestos.
### **6. Conclusión**

1. A pesar de que la inteligencia artificial ya permite obtener mucha información a partir de imagenes es realmente complejo el realizar un mapero de profundidad a partir de esto, sin embargo a medida que avanza esta disiplina es posible que llege a proveer resultados lo suficientemente buenos para casos de usos como el de este pincel 3D
2. A partir de las transformaciones afines es posible llegar a reprecentar matematicamente todo tipo de escenarios 3D y transformarlos de una forma ordenada, la cual permite abstraer toda la logica para poderse sentrar en la composición sin tener que preocuparse por todas las matematicas que soportan esto. 

### **7. Referencias**

- [3D Math Primer for Graphics and Game Development](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf)
- [Handpose](https://learn.ml5js.org/#/reference/handpose)

