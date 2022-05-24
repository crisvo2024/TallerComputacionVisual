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



### **3. Métodos**

Con la intención de mostrar la manipulación de objetos en 3D se implementa el pincel 3D, aprovechando la libreria de inteligencia artificial ML5.js, la cual posee un modelo preentrenado que permite hacer el reconocimiento de manos con base en los fotogramas de un video, este modelo ubica los diferentes puntos de la mano en un sistema de coordenadas con relación al video, pero que tambien incluye un eje Z con una aproximación de la profundidad.Para el pincel se decidio que el usuario pinte con la punta del dedo indice. Este pincel 3D dispone de 5 botonoes, uno para intercambiar el pincel que se usa, el cual se puede ser un conejo, una calavera o una paleta. El segundo boton permirte cambiar el color con el que se pinta. El tercer boton permite habilitar o deshabilitar el pincel. Finalmente los ultimos dos botones permiten exportar e importar respectivamente un dibujo en un archivo JSON. Adicionalmetente y como ayuda para el usuario se muestra en la esquina inferior la imagen de la camara y en la pantalla se muestra en todo momento la posición del pincel.

{{< p5-div sketch="/showcase/scripts/hermann-ml.js">}}


### **5. Discusión**

Es interesante todas las transformaciones que se dan detras de este pincel, se pueden ver cambios de espacios entre la pantalla y el mundo pero ademas se pueden ver las tranformaciones más simples en diferentes partes, un ejemplo es un reflejo de la camara para que el usuario pueda dibujar mejor, o las traslaciones usadas para el posicionamiento de los botones y demas objetos de la interfz, de la misma manera se ven efectos más complejos cuendo entramos a manipular la camara, causando rotaciones combinadas con traslaciones y escalamiento en diferentes ejes. Otra de las transformaciones interesantres es la que se realiza al posicionar la luz con respecto al mouse para cambiar la iluminación de lo dibujado y poder denotar bien la forma de los diferentes pinceles. 

Una extensión de este proyecto se podría dar mejorando el modelo de machine learning que se usa para la detección de la mano, esto con el objetivo de permitir el reconocimiento de dos manos o mejorar la precisión de la aproximación del eje Z la cual no es muy estable y es propensa a errores. tambien se podría permitir al usuario cargar sus propios pinceles y controlar la interfaz con solo gestos, sin embargo, esto ultimo estaría atado a mejorar el modelo incluyento la capasidad de detectar las 2 manos y diferenciarlas, o de un cambio en la forma de captar los movimientos y gestos.
### **6. Conclusión**

1. Nuestra vista es muy susceptible a los efectos visuales, en los cuales se usan cambios en el color frente a colores estáticos, esto que en su momento representó una ventaja evolutiva del ojo que nos permitió sobrevivir, es también lo que hace que no veamos el mundo exactamente como es.
2. En este tipo de efectos visuales, es mejor hacer combinaciones más simples, esto permite engañar la vista más fácilmente, a diferencia de cuando hacemos uso de muchos colores y efectos, casos en los que la ilusión se puede romper mucho más fácilmente.

### **7. Referencias**

- [Inhibición lateral: la supresión de neuronas mejora la percepción sensorial](https://www.greelane.com/es/ciencia-tecnolog%c3%ada-matem%c3%a1ticas/ciencia/lateral-inhibition-4687368/)
- [Inhibición lateral](https://en.wikipedia.org/wiki/Lateral_inhibition)
- [El contraste simultáneo](https://agrega.juntadeandalucia.es/repositorio/23112016/f8/es-an_2016112312_9101414/21_luz_y_color_el_contraste_simultneo.html)
- [Ley del contraste simultáneo de los colores](https://es.wikipedia.org/wiki/Ley_del_contraste_simult%C3%A1neo_de_los_colores#cite_note-7)
