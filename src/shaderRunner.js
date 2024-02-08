import { loadShader, compileShader } from './shader-loader.js';

// Assume canvas and image are already defined and loaded
const gl = canvas.getContext('webgl');

// Load and compile shaders
const vertexShaderUrl = 'path/to/vertex-shader.glsl';
const fragmentShaderUrl = 'path/to/fragment-shader.glsl';

async function main() {
    const vertexShaderSource = await loadShader(vertexShaderUrl);
    const fragmentShaderSource = await loadShader(fragmentShaderUrl);

    if (vertexShaderSource && fragmentShaderSource) {
        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Create shader program
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);

        // Create buffer for vertices
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const vertices = [
            -10.0,  10.0,
             10.0,  10.0,
            -10.0, -10.0,
             10.0, -10.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Configure shader attributes
        const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Create texture and set image as texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Draw the image
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

main();
