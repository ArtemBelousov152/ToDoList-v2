import { IProject, } from "../../models/project";
import { ITusk } from '../../models/task';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todoState {
    projects: IProject[],
    modalTodoIsOpen: boolean,
    modalAddTodoIsOpen: boolean,
    modalTaskId: string,
    activeTask: ITusk | null
} 

interface IAddTaskPayload {
    projectId: string
    task: ITusk
}

interface IDTaskPayload {
    projectId: string
    taskId: string
}

const initialState: todoState = {
    projects: [],
    modalTodoIsOpen: false,
    modalAddTodoIsOpen: false,
    modalTaskId: '',
    activeTask: null
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
        delTask(state, action: PayloadAction<IDTaskPayload>) {
            const projectId = state.projects.findIndex((item) => {
                return item.id === action.payload.projectId
            })
            state.projects[projectId].tasks = state.projects[projectId].tasks.filter(item => {
                return item.id !== action.payload.taskId
            })
        },
        setActiveTask(state, action: PayloadAction<IDTaskPayload>) {
            const {projectId, taskId} = action.payload
            
        }, 
        openModalTodo(state) {
            state.modalTodoIsOpen = true
        },
        closeModalTodo(state) {
            state.modalTodoIsOpen = false
        },
        openModalAddTodo(state) {
            state.modalAddTodoIsOpen = true
        },
        closeModalAddTodo(state) {
            state.modalAddTodoIsOpen = false
        },
    }
})

export default todoSlice.reducer;   