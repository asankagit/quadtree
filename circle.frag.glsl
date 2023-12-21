// Shadertoy scripts
// Fror circles 

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