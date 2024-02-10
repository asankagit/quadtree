import React, { useRef, useEffect, useState } from 'react';


const CanvasComponent = ({ width, src, height, setUpContext_=null}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const INITIAL_PROPS = {
        width: 100,
        height: 100,
        src: ''
    };
    const [canvasProps, setCanvasProps] = useState<CanvasProps>(INITIAL_PROPS);
    const prevPropsCountRef = useRef<CanvasProps>(INITIAL_PROPS);

    const setUpContext = (canvas, name) => {
        shaderBinder.paint(name, canvas);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
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

    return <canvas ref={canvasRef}  width={canvasProps.width} height={canvasProps.height}/>;
};

export default CanvasComponent;
