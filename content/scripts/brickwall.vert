/*
Vertex shader code to be coupled with brickwall.frag 
Generated with treegl version 0.1.3
*/
precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;
uniform vec4 light_pos;
varying vec2 texcoords2;
varying vec3 normal3;
varying vec3 position3;
varying vec3 light_dir;
varying vec3 eye;

void main() {
  texcoords2 = aTexCoord;
  vec3 pos = vec3(uModelViewMatrix * vec4(aPosition, 1.0));
  normal3 = normalize(uNormalMatrix * aNormal);
  light_dir = vec3(light_pos) - pos;
  eye = -pos;
  position3 = vec4(aPosition, 1.0).xyz;
  gl_Position = vec4(aPosition, 1.0);
}