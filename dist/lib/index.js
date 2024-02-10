"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CanvasComponent = function (_a) {
    var width = _a.width, src = _a.src, height = _a.height, _b = _a.setUpContext_, setUpContext_ = _b === void 0 ? null : _b;
    var canvasRef = react_1.useRef < HTMLCanvasElement > (null);
    var INITIAL_PROPS = {
        width: 100,
        height: 100,
        src: ''
    };
    var _c = react_1.useState < CanvasProps > (INITIAL_PROPS), canvasProps = _c[0], setCanvasProps = _c[1];
    var prevPropsCountRef = react_1.useRef < CanvasProps > (INITIAL_PROPS);
    var setUpContext = function (canvas, name) {
        shaderBinder.paint(name, canvas);
    };
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (canvas && setUpContext_) {
            setUpContext_(canvas, src);
        }
        if (width !== prevPropsCountRef.current.width) {
            setCanvasProps({
                width: width,
                height: height,
                src: src
            });
        }
    }, []);
    return <canvas ref={canvasRef} width={canvasProps.width} height={canvasProps.height}/>;
};
exports.default = CanvasComponent;
