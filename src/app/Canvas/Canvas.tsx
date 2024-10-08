import cls from './Canvas.module.css';
import {FC, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {startDrawing, drawing, stopDrawing} from '../../store/drawingSlice.ts';

const Canvas: FC = ({brushColor}) => {
    const isDrawing = useSelector((state: RootState) => state.drawing.isDrawing);
    const dispatch = useDispatch()

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<HTMLCanvasElement | null>(null);

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
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        dispatch(startDrawing({x, y}));
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y);
    }

    const draw = (e) => {
        if (!isDrawing) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        dispatch(drawing({x, y}));

        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
    }

    const endDraw = () => {
        if (!isDrawing) return;
        ctxRef.current.closePath();
        dispatch(stopDrawing());
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
