import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface drawState {
    isDrawing: boolean,
    lastX: number,
    lastY: number
}

const initialState: drawState = {
    isDrawing: false,
    lastX: 0,
    lastY: 0
}

export const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        // setIsDrawing: (state: drawState, action: PayloadAction<boolean>) => {
        //     // state.isDrawing = !state.isDrawing
        //     state.isDrawing = action.payload;
        // },
        startDrawing: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.isDrawing = true;
            state.lastX = action.payload.x;
            state.lastY = action.payload.y;
        },
        drawing: (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.lastX = action.payload.x;
            state.lastY = action.payload.y;
        },
        stopDrawing: (state) => {
            state.isDrawing = !state.isDrawing;
            state.lastX = 0;
            state.lastY = 0;
        },
    },
})

export const {
    setIsDrawing,
    startDrawing,
    drawing,
    stopDrawing
} = drawingSlice.actions

export default drawingSlice.reducer
