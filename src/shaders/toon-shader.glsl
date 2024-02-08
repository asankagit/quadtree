#pragma fragment output: fragColor

uniform sampler2D tex0;
uniform vec2 texSize;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 uv = fragCoord/iResolution.xy;

  vec3 color = texture(tex0, uv).rgb;

  // Calculate edge strength using Sobel filter
  float sobelX = (-texture(tex0, uv + vec2(0.1, 0.0)).r + texture(tex0, uv - vec2(0.1, 0.0)).r)
               + (-2.0 * texture(tex0, uv).r)
               + (texture(tex0, uv + vec2(-0.1, 0.0)).r + texture(tex0, uv - vec2(-0.1, 0.0)).r);
  float sobelY = (-texture(tex0, uv + vec2(0.0, 0.1)).r + texture(tex0, uv - vec2(0.0, 0.1)).r)
               + (-2.0 * texture(tex0, uv).r)
               + (texture(tex0, uv + vec2(0.0, -0.1)).r + texture(tex0, uv - vec2(0.0, -0.1)).r);
  float edgeStrength = max(abs(sobelX), abs(sobelY));

  // Apply toon shading based on edge strength and luminance
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 toonColors[3] = vec3[](vec3(0.1, 0.2, 0.4), vec3(0.5, 0.7, 1.0), vec3(1.0, 1.0, 1.0));
  int index = clamp(int(floor(edgeStrength * 2.0)), 0, 2);
  vec3 toonColor = mix(toonColors[index], toonColors[index + 1], smoothstep(0.3, 0.7, edgeStrength));

  // Apply lighting by adjusting brightness based on luminance
  fragColor = vec4(mix(toonColor, color, luminance), 1.0);
}