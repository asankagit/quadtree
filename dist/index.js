"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrayScale = exports.FlatGray = void 0;
var shaderBinder_1 = require("./lib/shaderBinder");
var flat_gray_1 = require("./shaders/flat-gray");
var graScale_1 = require("./shaders/graScale");
var FlatGray = function (fileName, canvas) {
    (0, shaderBinder_1.paint)(fileName, canvas, flat_gray_1.FlatGrayConvert);
};
exports.FlatGray = FlatGray;
var GrayScale = function (fileName, canvas) {
    (0, shaderBinder_1.paint)(fileName, canvas, graScale_1.GrayScaleConverter);
};
exports.GrayScale = GrayScale;
exports.default = shaderBinder_1.paint;
