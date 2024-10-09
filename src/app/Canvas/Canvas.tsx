import cls from './Canvas.module.css';
import {FC, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {startDrawing, drawing, stopDrawing} from '../../store/drawingSlice.ts';
import {selectedTool} from '../../store/toolSlice.ts';

const Canvas: FC = ({brushColor}) => {
    const dispatch = useDispatch();

    const isDrawing = useSelector((state: RootState) => state.drawing.isDrawing);
    const externalDraw = useSelector((state: RootState) => state.drawing.externalDraw);
    const tool = useSelector((state: RootState) => state.toolSlice.tool);

    console.log('isDrawing', isDrawing)

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
        if (externalDraw) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const scaleX = canvasRef.current!.width / rect.width;
            const scaleY = canvasRef.current!.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            dispatch(startDrawing({x, y}));
            ctxRef.current!.beginPath();
            ctxRef.current!.moveTo(x, y);
        }
    }

    const draw = (e) => {
        if (!isDrawing) return;

        if (externalDraw) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const scaleX = canvasRef.current!.width / rect.width;
            const scaleY = canvasRef.current!.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            const ctx = ctxRef.current;

            console.log(x, y)
            console.log(x, y)

            switch (tool) {
                case 'line':
                    ctx!.lineTo(x, y);
                    ctx!.stroke();
                    break;
                case 'square':

                    break;
                default:
                    break;
            }

            dispatch(drawing({x, y}));

            // ctxRef.current!.lineTo(x, y);
            // ctxRef.current!.stroke();


        }
    }

    const endDraw = () => {
        if (!isDrawing) return;
        ctxRef.current!.closePath();
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
