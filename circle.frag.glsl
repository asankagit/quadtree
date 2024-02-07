// Shadertoy scripts
// Fror circles 

float shape(vec2 st, float radius) {
	st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
    float f = radius;
    m += noise(st+u_time*0.1)*.5;
    // a *= 1.+abs(atan(u_time*0.2))*.1;
    // a *= 1.+noise(st+u_time*0.1)*0.1;
    f += sin(a*50.)*noise(st+u_time*.2)*.1;
    f += (sin(a*20.)*.1*pow(m,2.));
    return sin(u_time * st.y   * 10.); //1.-smoothstep(radius, radius + sin(u_time * st.x   * 10.) * 1. ,r);
}

float shapeBorder(vec2 st, float radius, float width) {
    return shape(st,radius) + shape(st,radius-width);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(1.0) * shapeBorder(st,0.8,0.02);

	gl_FragColor = vec4( 1.-color, 1.0 );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	// Normalize coordinates to center the circle:
  vec2 uv = fragCoord.xy / iResolution.xy - 0.5;

  vec2 adjustedUV = uv * vec2(iResolution.x / iResolution.y, 1.0);
  
  // Calculate distance from the origin:
  float distanceToCenter = length(adjustedUV);

  // Set radius and color:
  float radius = 0.25;  // Adjust for desired circle size
  vec3 circleColor = vec3(1.0, 1.0, 0.0);  // Orange circle

  // Smooth transition at the edge using smoothstep:
  float circleMask = smoothstep(radius, radius - 0.01, distanceToCenter);

  // Set background color:
  vec3 backgroundColor = vec3(0.2, 0.4, 0.6);  // Blueish background

  // Blend circle and background colors:
  fragColor = vec4(mix(backgroundColor, circleColor, circleMask), 1.0);
}

//https://thebookofshaders.com/edit.php#09/marching_dots.frag