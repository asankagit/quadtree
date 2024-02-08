import * as shaderBinder from "./shaderBinder"
import React, { useRef, useEffect, useState } from 'react';

const CanvasComponent = ({width, src:name, height}) => {
    const canvasRef = useRef(null);
    const INITIAL_PROPS = {
        width: 10,
        height: 10
    }
    const [canvasProps, setCanvasProps] = useState(INITIAL_PROPS);

    const prevPropsCountRef = useRef < Object > (INITIAL_PROPS);

    const setUpContext = (canvas, props) => {
        shaderBinder.paint(name, canvas)
    }

    useEffect((props) => {
        const canvas = canvasRef.current;
        setUpContext(canvas, props);
        if (canvasProps.width !== prevPropsCountRef.width) {
            setCanvasProps({
                width: width,
                height: height,
            })
        }
    }, []);


    return <canvas ref={canvasRef} width={canvasProps.width} height={canvasProps.height} />;
};

export default CanvasComponent;