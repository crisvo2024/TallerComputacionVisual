# **Taller Procesamiento de Imágenes**

En este taller se estudiaron distintas temáticas como lo son las máscaras de convolución (ya estudiadas en talleres anteriores), herramientas para el ampliamiento de imágenes y herramientas de luminosidad del color (utilizando distintos modelos de color), mediante el uso de shaders.

# Procesamiento de imágenes

### **1. Introducción**

El masking o la aplicación de máscaras de convolución juega un papel muy importante dentro del campo del procesamiento de imágenes ya que a través ellas es posible aplicar diferentes efectos como lo son desenfoque (**blur**), nitidez (**sharpening**), relieve (**embossing**), detección de bordes (**edge detection**), entre otros. Por otro lado, las herramientas de ampliamiento de imágenes permiten aumentar o disminuir el tamaño de distintas secciones de una imágen y son ampliamente utilizadas en los ordenadores de hoy en día. Finalmente, las herramientas de luminosidad de color permiten ajustar el brillo de las imágenes a través de la aplicación de distintos modelos de color.

### **2. Revisión bibliográfica**

El marco teórico relacionado con las *máscaras convolucionales* ya fue desarrollado en un taller previo y se puede ver [aquí]({{< ref "/docs/visual_computing/workshops/illutions.md" >}} "Masking") dentro de la sección de *"Masking"*.

Con respecto al desarrollo de la *herramienta de ampliación* de imágenes 

Finalmente para la *herramienta de luminosidad* se llevó a cabo la conversión entre el modelo de color RGBA y los siguientes modelos de color:

#### Luma:
Luma representa el brillo de una imagen (la parte "en blanco y negro" o acromática de la imagen), es decir, componente que codifica la información de luminosidad de la imagen. Representa la imagen acromática, mientras que los componentes del croma representan la información del color.
{{< katex display >}}
    Y' = 0.299R + 0.587G + 0.114B
{{< /katex >}}

#### HSL & HSV:
HSL (por sus siglas en inglés, hue, saturation, lightness) y HSV (por sus siglas en inglés, hue, saturation, value; también conocido como HSB, por sus siglas en inglés, hue, saturation, brightness) son representaciones alternativas del modelo de color RGB para ajustarse más a la forma en que la visión humana percibe los atributos del color. En estos modelos, los colores de cada matiz se disponen en una franja radial, alrededor de un eje central de colores neutros que va del negro en la parte inferior al blanco en la superior.

![HSL & HSV coloring models.](/showcase/sketches/hsl_hsv.png "HSL & HSV")

La representación HSL modela la forma en que las diferentes pinturas se mezclan para crear el color en el mundo real, con la dimensión de luminosidad que se asemeja a las cantidades variables de negro o blanco en la mezcla (por ejemplo, para crear el "rojo claro", se puede mezclar un pigmento rojo con pintura blanca; esta pintura blanca corresponde a un valor de "luminosidad" alto en la representación HSL). Los colores totalmente saturados se colocan alrededor de un círculo con un valor de luminosidad de 0.5, y un valor de luminosidad de 0 o 1 corresponde a un color totalmente negro o blanco, respectivamente.

La representación HSV modela cómo aparecen los colores bajo la luz. La diferencia entre HSL y HSV es que un color con la máxima luminosidad en HSL es blanco puro, pero un color con el máximo valor/brillo en HSV es análogo a iluminar con una luz blanca un objeto de color (por ejemplo, iluminar con una luz blanca brillante un objeto rojo hace que el objeto siga pareciendo rojo, sólo que más brillante e intenso, mientras que iluminar con una luz tenue un objeto rojo hace que el objeto parezca más oscuro y menos brillante).

**Conversión RGB  a HSL:**
{{< katex display >}}
    Cmax = max(R, G, B)\\
    Cmin = min(R, G, B)\\
    \Delta = Cmax - Cmin
{{< /katex >}}

Calculo de la luminosidad:
{{< katex display >}}
    L = \frac{(Cmax+Cmin)}{2}
{{< /katex >}}

Calculo de la tonalidad (Hue):
{{< katex display >}}
    H = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } \Delta = 0\\
            60^\circ * (\frac{G-B}{\Delta}mod6), & \text{if } Cmax = R\\
            60^\circ * (\frac{B-R}{\Delta}+2), & \text{if } Cmax = G\\
            60^\circ * (\frac{R-G}{\Delta}+4), & \text{if } Cmax = B
        \end{array}
    \right\}
{{< /katex >}}

Calculo de la saturación:
{{< katex display >}}
    S = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } \Delta = 0\\
            \frac{\Delta}{1-|2L-1|}, & \text{if } Cmax = R
        \end{array}
    \right\}
{{< /katex >}}

**Conversión RGB  a HSV:**
Los calculos para la conversión de RGB a HSV son similares a los de HSL, el componente de tonalidad se calcula de la misma manera.

Calculo del brillo:
{{< katex display >}}
    V = Cmax
{{< /katex >}}

Calculo de la tonalidad (Hue): igual que en HSL.

Calculo de la saturación:
{{< katex display >}}
    S = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } Cmax = 0\\
            \frac{\Delta}{Cmax}, & \text{if } Cmax \neq 0
        \end{array}
    \right\}
{{< /katex >}}

#### CIELAB:
El espacio de color CIELAB, también denominado L*a*b* , es un espacio de color definido por la Comisión Internacional de Iluminación (abreviada CIE) en 1976. Expresa el color en tres valores: L* para la luminosidad perceptiva, y a* y b* para los cuatro colores únicos de la visión humana: rojo, verde, azul y amarillo. El CIELAB se concibió como un espacio perceptualmente uniforme, en el que un cambio numérico determinado corresponde a un cambio percibido similar en el color. Aunque el espacio LAB no es realmente uniforme desde el punto de vista de la percepción, resulta útil en la industria para detectar pequeñas diferencias de color.

Al igual que el espacio CIEXYZ del que deriva, el espacio de color CIELAB es un modelo de "observador estándar" independiente del dispositivo. Los colores que define no son relativos a ningún dispositivo concreto, como un monitor de ordenador o una impresora, sino que se refieren al observador estándar de la CIE, que es un promedio de los resultados de los experimentos de coincidencia de colores en condiciones de laboratorio.

Para poder convertir de RGB a CIELAB primero habrá que convertir de RGB a CIEXYZ y luego de CIEXYZ a CIELAB como se muestra a continuación:

**RGB a CIEXYZ:**
{{< katex display >}}
X_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{R + 0.055}{1.055}^{2.4}), & \text{if } R > 0.04045\\
            R \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
Y_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{G + 0.055}{1.055}^{2.4}), & \text{if } G > 0.04045\\
            G \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
Z_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{B + 0.055}{1.055}^{2.4}), & \text{if } B > 0.04045\\
            B \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
{{< /katex >}}

Finalmente tenemos:

{{< katex display >}}
\begin{bmatrix}
    X\\
    Y\\
    Z
\end{bmatrix} = 
100 * 
\begin{bmatrix}
    X_{tmp}\\
    Y_{tmp}\\
    Z_{tmp}
\end{bmatrix} *
\begin{bmatrix}
    0.4124 & 0.3576 & 0.1805\\
    0.2126 & 0.7152 & 0.0722\\
    0.0193 & 0.1192 & 0.9505
\end{bmatrix}
{{< /katex >}}

**CIEXYZ a CIELAB:**

{{< katex display >}}
n = \begin{bmatrix}
    X\\
    Y\\
    Z
\end{bmatrix} \ div
\begin{bmatrix}
    95.047\\
    100\\
    108.883
\end{bmatrix}\\
{{< /katex >}}
Definimos un vextor **v** de tamaño 3 de tal manera que cada una de sus componentes se definen como:

{{< katex display >}}
v_0 = \left\{
        \begin{array}{lr}
            n_0^{\frac{1}{3}}, & \text{if } n_0 > 0.008856\\
            ( 7.787 * n_0 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}\\

v_1 = \left\{
        \begin{array}{lr}
            n_1^{\frac{1}{3}}, & \text{if } n_1 > 0.008856\\
            ( 7.787 * n_1 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}\\

v_0 = \left\{
        \begin{array}{lr}
            n_2^{\frac{1}{3}}, & \text{if } n_2 > 0.008856\\
            ( 7.787 * n_2 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}
{{< /katex >}}

Finalmente el resultado sería:
{{< katex display >}}
\begin{bmatrix}
    L\\
    A\\
    B
\end{bmatrix} = 
\begin{bmatrix}
    ( 116.0 * v_1 ) - 16.0\\
    500.0 * ( v_0 - v_1 )\\
    200.0 * ( v_1 - v_2 )
\end{bmatrix}
{{< /katex >}}

### **3. Métodos**

Para la realización de este ejercicio se llevó a cabo en primer lugar una revisión teórica de cada temática anteriormente mencionada relacionada con el procesamiento de imágenes. De esta manera tomando como apoyo la teoría estudida y ejemplos similiares de implementaciones ajustados a las necesidades se desarrollaron tres aplicaciones distintas, las cuales permiten observar de manera práctica la aplicación de cada uno de los temas.

### **4. Resultados**

### **4.1 Masking**

##### Funcionalidades utilizadas de glsl:
- **step(i, edge):** Genera una función escalonada comparando dos valores.
- **distance(p0, p1):** Calcula la distancia entre dos puntos.

{{< details title="p5 - masking shader code" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
    let maskShader;
    let img;
    let video_src;
    let video_on;
    let mask1 = true, mask2 = mask3 = mask4 = false;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        maskShader = readShader('/showcase/scripts/mask.frag', { varyings: Tree.texcoords2 });
        img = loadImage('/showcase/sketches/flowers.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
            maskShader.setUniform('texture', video_src);
            video_src.loop();
            } else {
            maskShader.setUniform('texture', img);
            video_src.pause();
            }
        });
        video_on.position(10, 60);
        
        // Blur select
        sel1 = createSelect();
        sel1.position(10, 10);
        sel1.option('original');
        sel1.option('ridges');
        sel1.option('blur1');
        sel1.option('blur2');
        sel1.changed(changeMask);

        // Region shape select
        sel2 = createSelect();
        sel2.position(10, 35);
        sel2.option('square');
        sel2.option('circle');
        sel2.changed(changeRegionShape);

        shader(maskShader);
        maskShader.setUniform('texture', img);
        emitTexOffset(maskShader, img, 'texOffset');
        maskShader.setUniform('region_shape', true);
        emitResolution(maskShader);
    }

    function draw() {
        background(0);
        emitMousePosition(maskShader);
        if (mask1) {
            maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
        } else if(mask2){
            maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
        } else if(mask3){
            maskShader.setUniform('mask', [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]);
        } else if(mask4) {
            maskShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);            
        }
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }

    function changeMask(){
        let selection = sel1.value();
        mask1 = mask2 = mask3 = mask4 = false;
        if (selection == 'original') {
            mask1 = true;
        } else if(selection == 'ridges'){
            mask2 = true;
        } else if(selection == 'blur1'){
            mask3 = true;
        } else if(selection == 'blur2') {
            mask4 = true;            
        }
    }

    function changeRegionShape(){
        let selection = sel2.value();
        if (selection == 'square') {
            maskShader.setUniform('region_shape', true);
        } else {
            maskShader.setUniform('region_shape', false);
        }
    }
{{< /p5-global-iframe */>}}

```
{{< /details >}}

{{< details title="mask.frag" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
    
    precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];
// mouse vector position
uniform vec2 u_mouse;
// resolution
uniform vec2 u_resolution;
// region shape
uniform bool region_shape;

// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {
    bool condition;
    vec2 st = gl_FragCoord.xy/u_resolution;
    if(region_shape){
        vec2 mouse_n = u_mouse.xy/u_resolution;
        float region_x = step(mouse_n.x - 0.1, st.x) - step(mouse_n.x + 0.1, st.x);
        float region_y = step(mouse_n.y - 0.1, st.y) - step(mouse_n.y + 0.1, st.y);
        condition = region_x == 1.0 && region_y == 1.0;
    } else {
        float region = distance(st, u_mouse.xy/u_resolution);
        condition = region < 0.1;
    }
    if(condition){
        // 1. Use offset to move along texture space.
        // In this case to find the texcoords of the texel neighbours.
        vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
        vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
        vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
        vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
        // origin (current fragment texcoords)
        vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
        vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
        vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
        vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
        vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

        // 2. Sample texel neighbours within the rgba array
        vec4 rgba[9];
        rgba[0] = texture2D(texture, tc0);
        rgba[1] = texture2D(texture, tc1);
        rgba[2] = texture2D(texture, tc2);
        rgba[3] = texture2D(texture, tc3);
        rgba[4] = texture2D(texture, tc4);
        rgba[5] = texture2D(texture, tc5);
        rgba[6] = texture2D(texture, tc6);
        rgba[7] = texture2D(texture, tc7);
        rgba[8] = texture2D(texture, tc8);

        // 3. Apply convolution kernel
        vec4 convolution;
        for (int i = 0; i < 9; i++) {
            convolution += rgba[i]*mask[i];
        }

        // 4. Set color from convolution
        gl_FragColor = vec4(convolution.rgb, 1.0);
    } else {
        gl_FragColor = texture2D(texture, texcoords2);
    }
}    
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="mask_shader" width="675" height="525" lib1="/showcase/scripts/p5.treegl.js">}}
    let maskShader;
    let img;
    let video_src;
    let video_on;
    let mask1 = true, mask2 = mask3 = mask4 = false;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        maskShader = readShader('/showcase/scripts/mask.frag', { varyings: Tree.texcoords2 });
        img = loadImage('/showcase/sketches/flowers.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
            maskShader.setUniform('texture', video_src);
            video_src.loop();
            } else {
            maskShader.setUniform('texture', img);
            video_src.pause();
            }
        });
        video_on.position(10, 60);
        
        // Blur select
        sel1 = createSelect();
        sel1.position(10, 10);
        sel1.option('original');
        sel1.option('ridges');
        sel1.option('blur1');
        sel1.option('blur2');
        sel1.changed(changeMask);

        // Region shape select
        sel2 = createSelect();
        sel2.position(10, 35);
        sel2.option('square');
        sel2.option('circle');
        sel2.changed(changeRegionShape);

        shader(maskShader);
        maskShader.setUniform('texture', img);
        emitTexOffset(maskShader, img, 'texOffset');
        maskShader.setUniform('region_shape', true);
        emitResolution(maskShader);
    }

    function draw() {
        background(0);
        emitMousePosition(maskShader);
        if (mask1) {
            maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
        } else if(mask2){
            maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
        } else if(mask3){
            maskShader.setUniform('mask', [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]);
        } else if(mask4) {
            maskShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);            
        }
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }

    function changeMask(){
        let selection = sel1.value();
        mask1 = mask2 = mask3 = mask4 = false;
        if (selection == 'original') {
            mask1 = true;
        } else if(selection == 'ridges'){
            mask2 = true;
        } else if(selection == 'blur1'){
            mask3 = true;
        } else if(selection == 'blur2') {
            mask4 = true;            
        }
    }

    function changeRegionShape(){
        let selection = sel2.value();
        if (selection == 'square') {
            maskShader.setUniform('region_shape', true);
        } else {
            maskShader.setUniform('region_shape', false);
        }
    }
{{< /p5-global-iframe >}}


### **4.2 Magnifier tool**

##### Funcionalidades utilizadas de glsl:
- **distance(p0, p1).**

{{< details title="p5 - magnifier tool code" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
    let magnifierShader;
    let img;
    let video_src;
    let video_on;
    let slider1, slider2;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        magnifierShader = readShader('/showcase/scripts/magnifier.frag', { varyings: Tree.texcoords2 | Tree.position2  });
        img = loadImage('/showcase/sketches/mahakala.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
                magnifierShader.setUniform('texture', video_src);
                video_src.loop();
            } else {
                magnifierShader.setUniform('texture', img);
                video_src.pause();
            }
        });
        video_on.position(10, 50);
        
        slider1 = createSlider(100, 600, 100, 50);
        slider1.position(10, 10);

        slider2 = createSlider(1, 9, 1, 1);
        slider2.position(10, 30);

        shader(magnifierShader);
        magnifierShader.setUniform('texture', img);
        magnifierShader.setUniform('radio', 100.0);
        magnifierShader.setUniform('scale', 0.1);
        emitResolution(magnifierShader);
    }

    function draw() {
        background(0);
        emitMousePosition(magnifierShader);
        magnifierShader.setUniform('radio', slider1.value());
        magnifierShader.setUniform('scale', slider2.value() / 10);
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< details title="magnifier.frag" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
    precision mediump float;

uniform sampler2D texture;
uniform float radio;
uniform float scale;

// mouse vector position
uniform vec2 u_mouse;

// resolution
uniform vec2 u_resolution;

vec2 curvatureGenerator(vec2 toPow,  float dis){
    float x = dis/radio;
    return toPow*(1.0-x)*exp(-2.0*x*x);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    gl_FragColor = texture2D(texture, vec2(uv.x, 1. - uv.y));
    vec2 center = u_mouse.xy;
    float dis = distance(gl_FragCoord.xy, center);
    if(dis < radio){
        vec2 disV = gl_FragCoord.xy - center;
        vec2 trueUV = (gl_FragCoord.xy - (curvatureGenerator(disV,dis) * scale) ) / u_resolution.xy;
    	gl_FragColor = texture2D(texture, vec2(trueUV.x, 1. - trueUV.y));  
    }
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="mask_shader" width="675" height="525" lib1="/showcase/scripts/p5.treegl.js">}}
    let magnifierShader;
    let img;
    let video_src;
    let video_on;
    let slider1, slider2;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        magnifierShader = readShader('/showcase/scripts/magnifier.frag', { varyings: Tree.texcoords2 | Tree.position2  });
        img = loadImage('/showcase/sketches/mahakala.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
                magnifierShader.setUniform('texture', video_src);
                video_src.loop();
            } else {
                magnifierShader.setUniform('texture', img);
                video_src.pause();
            }
        });
        video_on.position(10, 50);
        
        slider1 = createSlider(100, 600, 100, 50);
        slider1.position(10, 10);

        slider2 = createSlider(1, 9, 1, 1);
        slider2.position(10, 30);

        shader(magnifierShader);
        magnifierShader.setUniform('texture', img);
        magnifierShader.setUniform('radio', 100.0);
        magnifierShader.setUniform('scale', 0.1);
        emitResolution(magnifierShader);
    }

    function draw() {
        background(0);
        emitMousePosition(magnifierShader);
        magnifierShader.setUniform('radio', slider1.value());
        magnifierShader.setUniform('scale', slider2.value() / 10);
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }
{{< /p5-global-iframe >}}

### **4.3 Coloring brightness tools**

##### Funcionalidades utilizadas de glsl:
- **mix(x, y, a):** Restringe un valor para que se encuentre entre otros dos valores. **x** especifica el inicio del rango en el que se va a interpolar, **y** especifica el final del rango en el que se va a interpolar y **a** especifica el valor a utilizar para interpolar entre **x** e **y**.
- **step(i, edge).**
- **min(x, y):** Devuelve el menor de dos valores.
- **abs(x):** Devuelve el valor absoluto del parámetro.
- **max(x, y):** Devuelve el mayor de dos valores.
- **pow(x, y):** Devuelve el valor del primer parámetro elevado a la potencia del segundo.
- **mat3(x1, x2, ..., xn):** Declara una matriz de tamaño 3x3.


{{< details title="p5 - coloring brightness tool code" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
    let coloringShader;
    let img;
    let video_src;
    let video_on;
    let original = true, luma = hsv = hsl = lab = false;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        coloringShader = readShader('/showcase/scripts/coloring.frag', { varyings: Tree.texcoords2 });
        img = loadImage('/showcase/sketches/fire.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
            coloringShader.setUniform('texture', video_src);
            video_src.loop();
            } else {
            coloringShader.setUniform('texture', img);
            video_src.pause();
            }
        });
        video_on.position(10, 35);
        
        // Coloring select
        sel1 = createSelect();
        sel1.position(10, 10);
        sel1.option('original');
        sel1.option('luma');
        sel1.option('HSV');
        sel1.option('HSL');
        sel1.option('CIELAB');
        sel1.changed(changeColoring);

        shader(coloringShader);
        initializeUniforms();
        coloringShader.setUniform('texture', img);
    }

    function draw() {
        background(0);
        if (original) {
            coloringShader.setUniform('original', true);
        } else if(luma){
            coloringShader.setUniform('luma', true);
        } else if(hsv){
            coloringShader.setUniform('hsv', true);
        } else if(hsl){
            coloringShader.setUniform('hsl', true);
        } else if(lab){
            coloringShader.setUniform('lab', true);
        }
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }

    function changeColoring(){
        let selection = sel1.value();
        original = luma = hsv = hsl = lab = false;
        resetUniformsFalse();
        if (selection == 'original') {
            original = true;
        } else if(selection == 'luma'){
            luma = true;
        } else if(selection == 'HSV'){
            hsv = true;
        } else if(selection == 'HSL'){
            hsl = true;
        } else if(selection == 'CIELAB'){
            lab = true;
        }
    }

    function initializeUniforms(){
        resetUniformsFalse();
        coloringShader.setUniform('original', true);
    }

    function resetUniformsFalse(){
        coloringShader.setUniform('original', false);
        coloringShader.setUniform('luma', false);
        coloringShader.setUniform('hsv', false);
        coloringShader.setUniform('hsl', false);
        coloringShader.setUniform('lab', false);
    }
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< details title="coloring.frag" open=false >}}
```js
{{</* p5-global-iframe id="breath" width="675" height="525" >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;
uniform bool original;
uniform bool luma;
uniform bool hsv;
uniform bool hsl;
uniform bool lab;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float apply_luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

// returns hsv of given texel
float apply_hsv(vec3 texel) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(texel.bg, K.wz), vec4(texel.gb, K.xy), step(texel.b, texel.g));
    vec4 q = mix(vec4(p.xyw, texel.r), vec4(texel.r, p.yzx), step(p.x, texel.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x;
}

// returns hls of given texel
float apply_hsl(vec3 texel) {
    float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = texel.r;
	float g = texel.g;
	float b = texel.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	l = ( cMax + cMin ) / 2.0;
	if ( cMax > cMin ) {
		float cDelta = cMax - cMin;
        
		s = l < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
        
		if ( r == cMax ) {
			h = ( g - b ) / cDelta;
		} else if ( g == cMax ) {
			h = 2.0 + ( b - r ) / cDelta;
		} else {
			h = 4.0 + ( r - g ) / cDelta;
		}

		if ( h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return h, s, l;
}

// ------------------------- RGB TO CIELAB ------------------------------------

vec3 rgb2xyz (vec3 texel) {
	vec3 tmp;
    tmp.x = ( texel.r > 0.04045 ) ? pow( ( texel.r + 0.055 ) / 1.055, 2.4 ) : texel.r / 12.92;
    tmp.y = ( texel.g > 0.04045 ) ? pow( ( texel.g + 0.055 ) / 1.055, 2.4 ) : texel.g / 12.92,
    tmp.z = ( texel.b > 0.04045 ) ? pow( ( texel.b + 0.055 ) / 1.055, 2.4 ) : texel.b / 12.92;
    const mat3 mat = mat3(
		0.4124, 0.3576, 0.1805,
        0.2126, 0.7152, 0.0722,
        0.0193, 0.1192, 0.9505 
	);
    return 100.0 * tmp * mat;
}

vec3 xyz2lab (vec3 xyz) {
	vec3 n = xyz / vec3(95.047, 100, 108.883);
    vec3 v;
    v.x = ( n.x > 0.008856 ) ? pow( n.x, 1.0 / 3.0 ) : ( 7.787 * n.x ) + ( 16.0 / 116.0 );
    v.y = ( n.y > 0.008856 ) ? pow( n.y, 1.0 / 3.0 ) : ( 7.787 * n.y ) + ( 16.0 / 116.0 );
    v.z = ( n.z > 0.008856 ) ? pow( n.z, 1.0 / 3.0 ) : ( 7.787 * n.z ) + ( 16.0 / 116.0 );
    return vec3(( 116.0 * v.y ) - 16.0, 500.0 * ( v.x - v.y ), 200.0 * ( v.y - v.z ));
}

vec3 apply_lab(vec3 texel){
	return xyz2lab(rgb2xyz(texel));
}

// -----------------------------------------------------------

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  if (original){
      gl_FragColor = texel;
  } else if(luma){
      gl_FragColor = vec4((vec3(apply_luma(texel.rgb))), 1.0);
  } else if(hsv){
      gl_FragColor = vec4((vec3(apply_hsv(texel.rgb))), 1.0);
  } else if(hsl){
      gl_FragColor = vec4((vec3(apply_hsl(texel.rgb))), 1.0);
  } else if(lab){
	gl_FragColor = vec4((apply_lab(texel.rgb)), 1.0);
  }
}
{{< /p5-global-iframe */>}}
```
{{< /details >}}

{{< p5-global-iframe id="mask_shader" width="675" height="525" lib1="/showcase/scripts/p5.treegl.js">}}
    let coloringShader;
    let img;
    let video_src;
    let video_on;
    let original = true, luma = hsv = hsl = lab = false;

    function preload() {
        video_src = createVideo(['/showcase/sketches/gopro.webm']);
        video_src.hide(); // by default video shows up in separate dom
        coloringShader = readShader('/showcase/scripts/coloring.frag', { varyings: Tree.texcoords2 });
        img = loadImage('/showcase/sketches/fire.jpg');
    }

    function setup() {
        createCanvas(650, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        video_on = createCheckbox('video', false);
        video_on.style('color', 'white');
        video_on.changed(() => {
            if (video_on.checked()) {
            coloringShader.setUniform('texture', video_src);
            video_src.loop();
            } else {
            coloringShader.setUniform('texture', img);
            video_src.pause();
            }
        });
        video_on.position(10, 35);
        
        // Coloring select
        sel1 = createSelect();
        sel1.position(10, 10);
        sel1.option('original');
        sel1.option('luma');
        sel1.option('HSV');
        sel1.option('HSL');
        sel1.option('CIELAB');
        sel1.changed(changeColoring);

        shader(coloringShader);
        initializeUniforms();
        coloringShader.setUniform('texture', img);
    }

    function draw() {
        background(0);
        if (original) {
            coloringShader.setUniform('original', true);
        } else if(luma){
            coloringShader.setUniform('luma', true);
        } else if(hsv){
            coloringShader.setUniform('hsv', true);
        } else if(hsl){
            coloringShader.setUniform('hsl', true);
        } else if(lab){
            coloringShader.setUniform('lab', true);
        }
        quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    }

    function changeColoring(){
        let selection = sel1.value();
        original = luma = hsv = hsl = lab = false;
        resetUniformsFalse();
        if (selection == 'original') {
            original = true;
        } else if(selection == 'luma'){
            luma = true;
        } else if(selection == 'HSV'){
            hsv = true;
        } else if(selection == 'HSL'){
            hsl = true;
        } else if(selection == 'CIELAB'){
            lab = true;
        }
    }

    function initializeUniforms(){
        resetUniformsFalse();
        coloringShader.setUniform('original', true);
    }

    function resetUniformsFalse(){
        coloringShader.setUniform('original', false);
        coloringShader.setUniform('luma', false);
        coloringShader.setUniform('hsv', false);
        coloringShader.setUniform('hsl', false);
        coloringShader.setUniform('lab', false);
    }
{{< /p5-global-iframe >}}
### **5. Discusión**

Partiendo de los resultados obtenidos se puede evidenciar especialmente en el caso de masking o aplicación de máscaras de convolución sobre imágenes que el uso de shaders facilita la implementación de diferentes efectos visuales. No obstante, para esto se necesita familiarizarse con OpenGL Shading Language (GLSL) el cual tiene una curva de aprendizaje lenta si no se tienen los suficientes conocimientos o bases teóricas para la implementación de shaders. Por otro lado, vemos que con el uso de shaders se pueden llegar a desarrollar un sin fin de aplicaciones para distintos propósitos debido a su gran campo de aplicación.

### **6. Conclusión**

1. A comparación con el taller de *Masksing* desarrollado previamente el uso de shaders facilita la implementación de la aplicación de máscaras de convolución sobre diferentes imágenes.

2. Las herramientas de ampliación e iluminación de imágenes permiten el análisis de distintos aspectos de una imágen permitiendo observar detalles que a simple vista no son perceptibles.

### **7. Referencias**

- [Magnifier tool example](https://www.shadertoy.com/view/wsfBz8)
- [Region of interest](https://en.wikipedia.org/wiki/Region_of_interest)
- [Coloring brigthness tools](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages)
- [HSV coloring model conversion example](https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl)
- [HSL coloring conversion model example](https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion)
- [Lab color space converter](https://gist.github.com/mattatz/44f081cac87e2f7c8980)
- [THe Book of Shaders](https://thebookofshaders.com)
- [GLSL Programming/Vector and Matrix Operations](https://en.wikibooks.org/wiki/GLSL_Programming/Vector_and_Matrix_Operations)
- [Luma (Video) - Wikipedia](https://es.wikipedia.org/wiki/Luma_(video))
- [RGB TO HSL color conversion](https://www.rapidtables.com/convert/color/rgb-to-hsl.html)
- [HSL & HSV - Wikipedia](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages)
- [CIELAB color space - Wikipedia](https://en.wikipedia.org/wiki/CIELAB_color_space)
