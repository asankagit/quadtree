"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paint = void 0;
var webglUtils = require("./webgl-utils");
// REFERENCE: https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html
function render(image, canvasEle, shaderCode) {
    if (shaderCode === void 0) { shaderCode = null; }
    /** @type {HTMLCanvasElement} */
    var canvas = canvasEle; //document.getElementById("glCanvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    var vertexShader = (shaderCode === null || shaderCode === void 0 ? void 0 : shaderCode.vertex) ? shaderCode.vertex : "attribute vec2 a_position;\n    attribute vec2 a_texCoord;\n    \n    uniform vec2 u_resolution;\n    \n    varying vec2 v_texCoord;\n    \n    void main() {\n       // convert the rectangle from pixels to 0.0 to 1.0\n       vec2 zeroToOne = a_position / u_resolution;\n    \n       // convert from 0->1 to 0->2\n       vec2 zeroToTwo = zeroToOne * 2.0;\n    \n       // convert from 0->2 to -1->+1 (clipspace)\n       vec2 clipSpace = zeroToTwo - 1.0;\n    \n       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n    \n       // pass the texCoord to the fragment shader\n       // The GPU will interpolate this value between points.\n       v_texCoord = a_texCoord;\n    }";
    var fragmentShader = (shaderCode === null || shaderCode === void 0 ? void 0 : shaderCode.fragment) ? shaderCode.fragment : "precision mediump float;\n\n    // our texture\n    uniform sampler2D u_image;\n    uniform vec2 iResolution;\n    // the texCoords passed in from the vertex shader.\n    varying vec2 v_texCoord;\n    \n    void main() {\n        vec2 uv = gl_FragCoord.xy / iResolution;\n    \n        // get pixel information from uv location\n        vec4 texColor = texture2D(u_image, v_texCoord).bgra;\n    \n        float intensity = fract(texColor.x * texColor.y * 2.5);\n    \n        //gl_FragColor = texture2D(u_image, v_texCoord).bgra;\n        vec4 color;\n        if (intensity > 0.8)\n            color = vec4(texColor.rgb, 1.0);\n        else if (intensity > 0.5)\n            color = vec4(texColor.rgb, .9);\n        else if (intensity > 0.25)\n            color = vec4(texColor.rgb, .4);\n        else\n            color = vec4(texColor.rgb, .5);\n        \n        float grayScale = (texColor.r + texColor.g + texColor.b) / 3.0;\n        gl_FragColor = vec4(grayScale, texColor.gb * 1.8, 1.0);\n    \n       \n    }";
    // setup GLSL program
    var program = webglUtils.createProgramFromScripts(gl, vertexShader, fragmentShader);
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");
    // Create a buffer to put three 2d clip space points in
    var positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Set a rectangle the same size as the image.
    setRectangle(gl, 0, 0, image.width, image.height);
    // provide texture coordinates for the rectangle.
    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ]), gl.STATIC_DRAW);
    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation);
    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
    // Turn on the texcoord attribute
    gl.enableVertexAttribArray(texcoordLocation);
    // bind the texcoord buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
}
function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}
var paint = function (fileName, canvas, shaderCode) {
    if (shaderCode === void 0) { shaderCode = null; }
    var image = new Image();
    if (canvas.width && !Number.isNaN(canvas.width)) {
        image.width = canvas.width;
    }
    if (canvas.height && !Number.isNaN(canvas.height)) {
        image.height = canvas.height;
    }
    image.src = fileName;
    image.onload = function () {
        render(image, canvas, shaderCode);
    };
};
exports.paint = paint;
