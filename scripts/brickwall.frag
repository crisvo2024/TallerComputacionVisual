precision mediump float;


uniform vec2 u_resolution;
uniform float u_time;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 20.0;
    st.x += u_time/100.;
    float offset = step(1., mod(st.y,2.0));
    float limitY =  step(.8, mod(st.y,1.));
    float limitX = step(1.9, mod(st.x+offset,2.0));
    if(limitY==1.||limitX==1.){
        gl_FragColor = vec4(0.,0.,0.,1.0);
    }else{
        gl_FragColor = vec4(.79,.25,.32,1.0);
    }
}