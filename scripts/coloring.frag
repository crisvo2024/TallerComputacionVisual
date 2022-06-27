
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

// -----------------HSL & HSV ----------------------------------

float get_hs(float r, float g, float b, float cMax, float cMin, bool flag, float val) {
	float h = 0.0;
	float s = 0.0;

	if ( cMax > cMin ) {
		float cDelta = cMax - cMin;

		if(flag){
			s = val < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
		} else {
			s = cMax == 0.0 ? 0.0 : cDelta / cMax;
		}
                
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
	return h, s;
}

// returns hls of given texel
float apply_hsl(vec3 texel) {
	float r = texel.r;
	float g = texel.g;
	float b = texel.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	float l = ( cMax + cMin ) / 2.0;
	float h, s = get_hs(r, g, b, cMax, cMin, true, l);
	return h, s, l;
}

// returns hsv of given texel
float apply_hsv(vec3 texel) {
	float r = texel.r;
	float g = texel.g;
	float b = texel.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	float v = cMax;
	float h, s = get_hs(r, g, b, cMax, cMin, false, v);
	return h, s, v;
}

// -----------------------------------------------------------

// ------------------------- RGB TO CIELAB -------------------

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