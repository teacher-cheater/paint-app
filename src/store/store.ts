import {configureStore} from '@reduxjs/toolkit'
import drawingState from '../store/drawingSlice.ts';
import startDrawing from '../store/drawingSlice.ts';
import setIsDrawing from '../store/drawingSlice.ts';
import drawing from '../store/drawingSlice.ts';
import stopDrawing from '../store/drawingSlice.ts';


export const store = configureStore({
    reducer: {
        drawingState: drawingState,
        startDrawing: startDrawing,
        setIsDrawing: setIsDrawing,
        drawing: drawing,
        stopDrawing: stopDrawing
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
