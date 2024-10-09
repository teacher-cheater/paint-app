import {createSlice} from '@reduxjs/toolkit'

export interface toolState {
    tool: string,
}

const initialState: toolState = {
    tool: 'line'
}

export const toolSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        selectedTool: (state, action) => {
            state.tool = action.payload;
        },
    }
});

export const {
    selectedTool,
} = toolSlice.actions

export default toolSlice.reducer
