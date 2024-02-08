
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    return smoothstep(0.005, 0.0, abs(st.y - st.x));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 st = fragCoord.xy/iResolution.xy;

    float y = st.y;

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st);
    
    color = (1.0- pct ) * color + pct * vec3(0.0,1.0,0.0);

	fragColor = vec4(color,1.0);
  //fragColor = vec4(mix(backgroundColor, circleColor, circleMask), 1.0);
	
}