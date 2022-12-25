import { IProject } from "../../models/";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todoState {
    projects: IProject[]
}   

const initialState: todoState = {
    projects: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addProject(state, action: PayloadAction<IProject>) {
            state.projects = [...state.projects, action.payload]
        }
    }
})

export default todoSlice.reducer;   