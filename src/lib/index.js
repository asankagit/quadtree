"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shaderBinder = __importStar(require("./shaderBinder"));
var react_1 = __importStar(require("react"));
var CanvasComponent = function (_a) {
    var width = _a.width, src = _a.src, height = _a.height;
    var canvasRef = (0, react_1.useRef)(null);
    var INITIAL_PROPS = {
        width: 100,
        height: 100,
        src: ''
    };
    var _b = (0, react_1.useState)(INITIAL_PROPS), canvasProps = _b[0], setCanvasProps = _b[1];
    var prevPropsCountRef = (0, react_1.useRef)(INITIAL_PROPS);
    var setUpContext = function (canvas, name) {
        shaderBinder.paint(name, canvas);
    };
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (canvas) {
            setUpContext(canvas, src);
        }
        if (width !== prevPropsCountRef.current.width) {
            setCanvasProps({
                width: width,
                height: height,
                src: src
            });
        }
    }, []);
    return react_1.default.createElement("canvas", { ref: canvasRef, width: canvasProps.width, height: canvasProps.height });
};
exports.default = CanvasComponent;
