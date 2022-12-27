import { IProject, } from "../../models/project";
import { ITusk } from '../../models/task';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todoState {
    projects: IProject[]
} 

interface IAddTaskPayload {
    projectId: string | undefined
    task: ITusk
}

interface IDelTaskPayload {
    projectId: string | undefined
    taskId: string
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
        },
        delProject(state, action: PayloadAction<string>) {
            state.projects = state.projects.filter(item => item.id !== action.payload)
        },
        addTask(state, action: PayloadAction<IAddTaskPayload>) {
            const projectId = state.projects.findIndex((item) => {
                return item.id === action.payload.projectId
            })
            state.projects[projectId].tasks.push(action.payload.task)
        },
        delTask(state, action: PayloadAction<IDelTaskPayload>) {
            const projectId = state.projects.findIndex((item) => {
                return item.id === action.payload.projectId
            })
            state.projects[projectId].tasks = state.projects[projectId].tasks.filter(item => {
                return item.id !== action.payload.taskId
            })
        }
    }
})

export default todoSlice.reducer;   