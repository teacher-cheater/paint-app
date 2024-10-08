import cls from './Canvas.module.css';
import {FC, useEffect, useRef} from "react";

const Canvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            console.log(canvasRef.current)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className={cls.canvas}></canvas>
    );
};

export default Canvas;
