# Grid illutions

Look at [this](https://mathworld.wolfram.com/ScintillatingGridIllusion.html) and also [this](https://www.illusionsindex.org/i/scintillating-grid) among many more references there are.

{{< details title="p5-div markdown" open=false >}}

```html
{{</* p5-div sketch="/showcase/sketches/workshopEj1.js" */>}}
```

{{< /details >}}

{{< p5-div sketch="/showcase/sketches/workshopEj1.js" >}}

{{< p5-div sketch="/showcase/sketches/workshopEj2.js" >}}

{{< p5-div sketch="/showcase/sketches/workshopEj3.js" >}}

<!-- ------------------------- CONVOLUTION -------------------------------- -->
# Masking

### **1. Introducción**
El masking juega un papel muy importante dentro del campo del procesamiento de imágenes ya que a través de una operación de convolución entre el kernel (matriz) y la imagen es posible aplicar efectos de desenfoque (**blur**), nitidez (**sharpening**), relieve (**embossing**), detección de bordes (**edge detection**), etc. De este hecho nace el propósito de este reporte de analizar el proceso de convolución de imágenes de tal manera que se realice un recorrido por cada uno de los conceptos que lo describen con la finalidad de obtener un panorama general. Se iniciará llevando a cabo una revisión de la bibliografía relacionada con el tema, posteriormente se realizará una descripción de la metodología utilizada para llevar a cabo el experimento, a continuación se analizarán los resultados obtenidos del experimento, luego se discutirán dichos resultados y finalmente se postularán las conclusiones del estudio.

### **2. Revisión bibliográfica**
Empezaremos definiendo la convolución de imágenes como un filtro de propósito general para imágenes que consiste en determinar el valor del color de un píxel central como la suma de los valores de color ponderados de sus vecinos o píxeles adyacentes con el fin de obtener como salida la imagen modificada con el filtro. Por otro lado, definiremos un **kernel** como una matriz de números que es usada para realizar la convolución y que de acuerdo a los valores que esta contenga se van a producir distintos resultados para una misma imagen. 

Para introducir la fórmula general de la operación de convolución primero veremos un ejemplo:
{{< katex display >}}
  \begin{bmatrix}
    164 & 188 & 164\\
    178 & 201 & 197\\
    174 & 168 & 181
  \end{bmatrix} *
  \begin{bmatrix}
    0 & 1 & 0\\
    1 & 1 & 1\\
    0 & 1 & 0
  \end{bmatrix}
{{< /katex >}}

De aquí se quiere determinar el valor del pixel del medio, es decir, el pixel que tiene el valor actual de 201. Para determinar el nuevo valor del píxel se realizan las siguientes operaciones:

Sea *V* el valor de salida del pixel, *C[i, j]* el valor del píxel en dicha posición de la matriz, *K[i, j]* el valor del kernel en esa posición y *F* la suma de de los coeficientes del kernel o 1 si la suma de los coeficientes es 0, entonces

{{< katex display >}}
  V = ((C[3,3]*K[1,1])+(C[3,2]*K[1,2])+(C[3,1]*K[1,3])+(C[2,3]*K[2,1])+\\
  (C[2,2]*K[2,2]) + +(C[2,1]*K[2,3])+(C[1,3]*K[3,1])+(C[1,2]*K[3,2])+\\
  (C[1,1]*K[3,3])) \div F
{{< /katex >}}

{{< katex display >}}
  V = ((181*0)+(168*1)+(174*0)+(197*1)+(201*1)+(178*1)+(164*0)+\\
  (188*1)+(164*0)) \div 5
{{< /katex >}}

{{< katex display >}}
  V = \frac{(168+197+201+178+188)}{5}=\frac{932}{5}=186.4
{{< /katex >}}

Con este ejemplo ahora introducimos la fórmula general para la operación de convolución de imágenes:
{{< katex display >}}
  V = |\frac{\sum_{i=1}^{m} \sum_{j=1}^{m} c_{(m-i)(n-j)} * d_{(1+i)(1+j)}}{F}|
{{< /katex >}}

Otro concepto clave que será de utilidad para comprender el experimento realizado es el de histograma de una imagen. Tenemos que *“un histograma de una imagen es un tipo de histograma que actúa como representación gráfica de la distribución tonal en una imagen digital”*. El histograma de una imagen representa el número de píxeles de cada valor tonal donde el eje de abscisas (eje x) representa las variaciones tonales mientras que el eje de las ordenadas (eje y) representa el total de píxeles en ese tono específico. A modo de ejemplo observemos la siguiente imagen y su respectivo histograma:

![Histograma de una paisaje oscuro.](/showcase/sketches/histograma01.jpg "Paisaje oscuro")

Del histograma tenemos que el eje de absisas indica los distitntos tonos de gris desde el negro al blanco (de izquierda a derecha). A partir de lo anterior podemos inferir que se trata de una imagen con tonos apagados, es decir, que la imagen está oscura ya que la gráfica tiende a estar sobre la parte izquierda mientras que en la parte derecha no existe información y en el caso que hubiera muchas zonas de color negro entonces la grafica seria un pico ubicado en la parte izquierda. 

### **3. Métodos**
Para llevar a cabo este ejercicio académico se llevó a cabo en primer lugar una revisión teórica de cada uno de los conceptos que envuelven la temática de convolución aplicado en el procesamiento de imágenes. De esta manera se investigaron distintas fuentes de información debidamente citadas de las cuales se extrajeron ideas generales acerca de conceptos clave como la operación de convolución en imágenes y los histogramas de imágenes para poder analizar el resultados de las convoluciones realizadas.

Finalmente se desarrolló un programa con el fin de aplicar distintos kernels o matrices en la operación de convolución y de esta manera verificar la operación en la imagen y además analizar su histograma.

### **4. Resultados**
A partir del estudio realizado se realizó un programa con el fin de presentar gráficamente el efecto de la operación de convolución en imágenes y analizar el cambio de las tonalidades de sus colores a través de su correspondiente histograma.

{{< p5-div sketch="/showcase/sketches/workshopEj4.js" >}}

### **5. Discusión**

El programa permite ingresar los valores del kernel y posteriormente aplicar la operación al oprimir el botón **apply**. Un ejercicio simple pero ilustrativo es establecer todos los valores de la matriz en cero pero únicamente el valor del medio se puede ir variando por ejemplo de 0 a 2 en intervalos de 0.1, esto con el fin de aplicar un efecto que permite oscurecer o aumentar el brillo de la imagen.

{{< hint info >}}
**Cambio en las tonalidades**  
- Si el valor que se estabece está entre [0,1) entonces la imagen se verá más oscura. <br>
- Si el valor que se estabece es 1 entonces la imagen no cambiará la tonalidad de sus colores. <br>
- Si el valor que se estabece está entre (1,2] entonces la imagen se verá con más brillo.
{{< /hint >}}

Es lógico pensar que si el valor que se toma es 1 entonces el resultado de la operación de convolución para cada píxel será el mismo color que se tenía ya que se está multiplicado únicamente ese valor por 1 y los demás por 0. Así mismo, la analogía aplicaría igual si el valor es menor o mayor 1 para oscurecer o aumentar el brillo en la imagen respectivamente.

### **6. Conclusión**

1. La convolución es una operación matématica utilizada en varios campos de estudio (por ejemplo en señales y comunicaciones) y en el procesamiento de imágenes juega un papel importante en distintas implementaciones como filtros en aplicaciones, reconocimiento facial, entre otros. 
2. Los histogramas de imágenes son herrmientas útiles para el análisis de tonalidades de los colores ya que permiten evidenciar de manera clara características de la imagen como si existen tonos apagados, sombras o zonas oscuras, si la imagen esta en contraluz, etc.

### **7. Referencias**

- [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
- [Image convolution - Jamie Ludwig - Portland State University](http://web.pdx.edu/~jduh/courses/Archive/geog481w07/Students/Ludwig_ImageConvolution.pdf)
- [El histograma](http://www.thewebfoto.com/2-hacer-fotos/217-el-histograma)
- [Image histogram](https://en.wikipedia.org/wiki/Image_histogram)
- [Applications of Convolution in Image Processing)](https://www.youtube.com/watch?v=BQyMZ0caFbg)
