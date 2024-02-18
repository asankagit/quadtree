export const FlatGrayConvert = {
    vertex: `attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    
    varying vec2 v_texCoord;
    
    void main() {
       // convert the rectangle from pixels to 0.0 to 1.0
       vec2 zeroToOne =  a_position * vec2(1.0) / u_resolution;
    
       // convert from 0->1 to 0->2
       vec2 zeroToTwo = zeroToOne * 2.0;
    
       // convert from 0->2 to -1->+1 (clipspace)
       vec2 clipSpace = zeroToTwo - 1.0;
    
       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
       // pass the texCoord to the fragment shader
       // The GPU will interpolate this value between points.
       v_texCoord = a_texCoord;
    }`,
    fragment: `precision mediump float;

    // our texture
    uniform sampler2D u_image;
    uniform vec2 iResolution;
    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / iResolution * 20.0;
    
        // get pixel information from uv location
        vec4 texColor = texture2D(u_image, v_texCoord).bgra;
    
        float grayScale = (texColor.r + texColor.g + texColor.b) / 3.0;
        // float intensity = fract(texColor.x * texColor.y * .524584);
        float intensity = fract(grayScale * 0.5378785741);
    
        //gl_FragColor = texture2D(u_image, v_texCoord).bgra;
        vec4 color;

        if (intensity > 0.5)
            color = vec4(grayScale,grayScale,grayScale, 1.0);
        else if (intensity > 0.25)
            color = vec4(0.2, 0.3, 0.3, 1.0);
        else
            color = vec4(0.1, .10, .10, 1.0);
        
        gl_FragColor = color;
    
       
    }`
    }