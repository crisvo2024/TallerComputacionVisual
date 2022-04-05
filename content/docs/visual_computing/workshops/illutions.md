# **Taller Ilusiónes**

En este taller se exploraron dos lineas diferentes de ilusi[ones de computación visual, que aunque parecen diferentes inicialmente, ambas terminan siendo fundamentos que en conjunto dan forma al prosesamiento de imagenes en inteligencia artificial.

# Grid illutions

### **1. Introducción**

Las ilusiones de cuadrículas hacen referencia a cualquier tipo de cuadrícula que engaña la visión de una persona. Las dos ilusiones más conocidas son:

#### La ilusión de la cuadrícula de Hermann

{{< p5-div sketch="/showcase/sketches/hermann.js" >}}

#### La ilusión de la cuadrícula centelleante

{{< p5-div sketch="/showcase/sketches/scintillating.js" >}}

A partir de lo visto en estas ilusiones, nace la idea de explorar las posibilidades de estos tipos de ilusiones, así como los fundamentos de porqué logran engañar nuestra visión.Iniciaremos realizando una exploración bibliográfica, para después describir el método utilizado para experimentar con variaciones de las ilusiones de cuadrícula y finalmente mostrar y analizar los resultados obtenidos, junto con las conclusiones obtenidas a partir de ellos.

### **2. Revisión bibliográfica**

La principal explicación que se ha intentado dar para estos efectos visuales está basada en la Inhibición lateral y la Ley del contraste simultáneo de los colores, conceptos interrelacionados que explicaremos a continuación.

#### Inhibición lateral

En neurobiología, la inhibición lateral es la capacidad de una neurona excitada de reducir la actividad de sus vecinas. En este proceso las señales nerviosas a las neuronas vecinas (situadas lateralmente a las neuronas excitadas) disminuyen. La inhibición lateral permite al cerebro gestionar la información ambiental y evitar la sobrecarga de información. Al amortiguar la acción de algunos estímulos sensoriales y mejorar la acción de otros, la inhibición lateral ayuda a agudizar nuestra percepción sensorial de la vista, el oído, el tacto y el olfato.

Este fenomeno mejora la percepción de los bordes y aumenta el contraste en las imagenes visuales es por esto que la inhibición lateral ha sido incorporada a sistemas de sensores artificiales como chips de visión, sistemas auditivos y ratones opticos.

En la inhibición lateral, algunas neuronas se estimulan en mayor grado que otras. Una neurona altamente estimulada (neurona principal) libera neurotransmisores excitadores a las neuronas a lo largo de un camino particular. Al mismo tiempo, la neurona principal altamente estimulada activa interneuronas en el cerebro que inhiben la excitación de las células ubicadas lateralmente. Las interneuronas son células nerviosas que facilitan la comunicación entre el sistema nervioso central y las neuronas motoras o sensoriales. Esta actividad crea un mayor contraste entre varios estímulos y da como resultado un mayor enfoque en un estímulo vívido. La inhibición lateral se produce en los sistemas sensoriales del cuerpo, incluidos los sistemas olfativo , visual, táctil y auditivo.

El efecto de ésta inhibición lateral fue descubierto por Ernst Mach, que explicó en 1865 la ilusión visual denominada bandas de March. Este efecto produce que paneles que generan diferentes sombras colocados uno al lado del otro aparezcan más claros o más oscuros en las transiciones, a pesar del color uniforme dentro de un panel. Los paneles aparecen más claros en el borde con un panel más oscuro, y más oscuros en el borde con un panel más claro. Las bandas más oscuras y más claras en las transiciones no son reales, sino el resultado de la inhibición lateral. Las neuronas de la retina que reciben una mayor estimulación inhiben a las neuronas adyacentes en mayor grado que las células que reciben una estimulación menos intensa. Los receptores de luz que reciben información del lado más claro de los bordes producen una respuesta visual más fuerte que los receptores que reciben información del lado más oscuro. Esta respuesta del sistema nervisoso mejora el contraste en los bordes, haciendo que sean más pronunciados.

#### Ley del contraste simultáneo de los colores

La ley del contraste simultáneo de los colores (en francés, loi du contraste simultané des couleurs) es una característica de la percepción humana del color establecida en 1839 por el químico francés Michel-Eugène Chevreul:

{{< hint info >}}

El tono de dos piezas de color parece más diferente cuando se observan yuxtapuestos que cuando se observan separadamente, sobre un fondo neutro común.

{{< /hint >}}

Una demostración de este fenomeno en el ambito de la luminosidad es la siguiente imagen:

{{< p5-div sketch="/showcase/sketches/contraste-simultaneo.js" >}}

Los dos cuadrados, uno encima del otro, en la zona de la derecha tienen la misma luminancia,
y aparecen tan claros uno y otro, ya que se ven sobre el mismo fondo claro.
El pequeño cuadrado oscuro adyacente en la parte inferior derecha parece casi tan oscuro como la gran pieza de la izquierda,
pero tiene la misma luminancia que el pequeño cuadrado del centro del gran cuadrado de la izquierda,
que parece mucho más claro, ya que está en un fondo sombreado.

En el ambito del tono
En contacto con una pieza de color de diferente tonalidad, pero de luminosidad tan igual como sea posible, un color cambia de tono para distanciarse de aquel del que está yuxtapuesto.

{{< p5-div sketch="/showcase/sketches/contraste-simultaneo-tono.js" >}}

Ejemplo con rojo y naranja: si, manteniendo como referencia los dos colores aislados
sobre un fondo neutro, se yuxtapone un rojo y un naranja, el rojo de la pieza en contacto tira hacia el púrpura,
mientras que el naranja tira al amarillo. Sólo hay dos colores sobre el fondo gris.

### **3. Métodos**

Para llevar a cabo este ejercicio académico se llevó a cabo en primer lugar una experimentación con diferentes colores y patrones para tratar de generar diferentes ilusiones que se pueden construir a partir de cuadrículas. Posteriormente se realizó la revisión teórica de porque estos efectos visuales se producen.

### **4. Resultados**

A partir de la experimentación se llego a estos efectos:

{{< p5-div sketch="/showcase/sketches/workshopEj1.js" >}}

{{< p5-div sketch="/showcase/sketches/workshopEj2.js" >}}

{{< p5-div sketch="/showcase/sketches/workshopEj3.js" >}}

### **5. Discusión**

Es interesante como al tomar la ilusión de la cuadrícula centelleante, y cambiar los colores de los puntos, se pudo generar otro efecto visual diferente en el que las lineas grices que conectan los puntos parecen cambiar de color de izquierda a derecha, como si se fuera cambiando lentamente el color de las lineas a violeta. Pero en realidad el cambio de color se hace en los puntos que se encuentran en las intercepciones de la cuadrícula, los cuales comienzan en blanco y terminan en vioeta. Este efecto ilustra a la perfección el cambio en la percepción de los colores cuando están rodeados por diferentes colores

En el segundo caso, al cambiar aún más drasticamente los colores y no usar cambios de color lentos, se puede generar otro efecto visual, en este caso al concentrase en algunos puntos de la cuadricula, es posible ver lineas diagonales que atraviezan la cuadricula, estas lineas no existen, sino que son resultado de la inhibición lateral que afecta nuestros ojos.

Finalmente en la última ilusión se intentó hacer combinaciones más complejas, sin embargo vemos que la ilusión ya no es tan evidente, ni sorprendente, sin embargo algunas personas dijeron ver que pareciera que en el centro el degradé sube más rápidamente que en los extremos laterales.

### **6. Conclusión**

1. Nuestra vista es muy susceptible a los efectos visuales, en los cuales se usan cambios en el color frente a colores estáticos, esto que en su momento representó una ventaja evolutiva del ojo que nos permitió sobrevivir, es también lo que hace que no veamos el mundo exactamente como es.
2. En este tipo de efectos visuales, es mejor hacer combinaciones más simples, esto permite engañar la vista más fácilmente, a diferencia de cuando hacemos uso de muchos colores y efectos, casos en los que la ilusión se puede romper mucho más fácilmente.

### **7. Referencias**

- [Inhibición lateral: la supresión de neuronas mejora la percepción sensorial](https://www.greelane.com/es/ciencia-tecnolog%c3%ada-matem%c3%a1ticas/ciencia/lateral-inhibition-4687368/)
- [Inhibición lateral](https://en.wikipedia.org/wiki/Lateral_inhibition)
- [El contraste simultáneo](https://agrega.juntadeandalucia.es/repositorio/23112016/f8/es-an_2016112312_9101414/21_luz_y_color_el_contraste_simultneo.html)
- [Ley del contraste simultáneo de los colores](https://es.wikipedia.org/wiki/Ley_del_contraste_simult%C3%A1neo_de_los_colores#cite_note-7)

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
\end{bmatrix} \*
\begin{bmatrix}
0 & 1 & 0\\
1 & 1 & 1\\
0 & 1 & 0
\end{bmatrix}
{{< /katex >}}

De aquí se quiere determinar el valor del pixel del medio, es decir, el pixel que tiene el valor actual de 201. Para determinar el nuevo valor del píxel se realizan las siguientes operaciones:

Sea _V_ el valor de salida del pixel, _C[i, j]_ el valor del píxel en dicha posición de la matriz, _K[i, j]_ el valor del kernel en esa posición y _F_ la suma de de los coeficientes del kernel o 1 si la suma de los coeficientes es 0, entonces

{{< katex display >}}
V = ((C[3,3]*K[1,1])+(C[3,2]*K[1,2])+(C[3,1]*K[1,3])+(C[2,3]*K[2,1])+\\
(C[2,2]*K[2,2]) + +(C[2,1]*K[2,3])+(C[1,3]*K[3,1])+(C[1,2]*K[3,2])+\\
(C[1,1]\*K[3,3])) \div F
{{< /katex >}}

{{< katex display >}}
V = ((181*0)+(168*1)+(174*0)+(197*1)+(201*1)+(178*1)+(164*0)+\\
(188*1)+(164\*0)) \div 5
{{< /katex >}}

{{< katex display >}}
V = \frac{(168+197+201+178+188)}{5}=\frac{932}{5}=186.4
{{< /katex >}}

Con este ejemplo ahora introducimos la fórmula general para la operación de convolución de imágenes:
{{< katex display >}}
V = |\frac{\sum*{i=1}^{m} \sum*{j=1}^{m} c*{(m-i)(n-j)} \* d*{(1+i)(1+j)}}{F}|
{{< /katex >}}

Otro concepto clave que será de utilidad para comprender el experimento realizado es el de histograma de una imagen. Tenemos que _“un histograma de una imagen es un tipo de histograma que actúa como representación gráfica de la distribución tonal en una imagen digital”_. El histograma de una imagen representa el número de píxeles de cada valor tonal donde el eje de abscisas (eje x) representa las variaciones tonales mientras que el eje de las ordenadas (eje y) representa el total de píxeles en ese tono específico. A modo de ejemplo observemos la siguiente imagen y su respectivo histograma:

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
