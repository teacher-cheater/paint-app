import cls from './Canvas.module.css';
import {FC, useEffect, useRef, useState} from "react";

const Canvas: FC = ({brushColor}) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = brushColor;
        ctxRef.current = ctx;
    }, [brushColor]);

    const startDraw = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width; // Коэффициент по оси X
        const scaleY = canvasRef.current.height / rect.height; // Коэффициент по оси Y

        setIsDrawing(true);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY
        );
    }

    const draw = (e) => {
        if (!isDrawing) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        ctxRef.current.lineTo(
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY
        );
        ctxRef.current.stroke();
    }

    const endDraw = () => {
        if (!isDrawing) return;
        ctxRef.current.closePath();
        setIsDrawing(false);
    }

    return (
        <canvas
            ref={canvasRef}
            className={cls.canvas}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
        >

        </canvas>
    );
};

export default Canvas;
