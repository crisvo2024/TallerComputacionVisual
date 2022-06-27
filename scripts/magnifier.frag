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