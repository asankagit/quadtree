import * as shaderBinder from "./shaderBinder";
import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
    width: number;
    height: number;
    src: string;
}

const CanvasComponent: React.FC<CanvasProps> = ({ width, src, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const INITIAL_PROPS: CanvasProps = {
        width: 100,
        height: 100,
        src: ''
    };
    const [canvasProps, setCanvasProps] = useState<CanvasProps>(INITIAL_PROPS);
    const prevPropsCountRef = useRef<CanvasProps>(INITIAL_PROPS);

    const setUpContext = (canvas: HTMLCanvasElement, name: string) => {
        shaderBinder.paint(name, canvas);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
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

    return <canvas ref={canvasRef}  width={canvasProps.width} height={canvasProps.height}/>;
};

export default CanvasComponent;
