import { IProject, } from "../../models/project";
import { ITusk } from '../../models/task';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todoState {
    projects: IProject[];
    modalTodoIsOpen: boolean;
    modalAddTodoIsOpen: boolean;
    modalTaskId: string;
    activeTask: ITusk | null;
    activeProjectIndex: number;
    activeTaskIndex: number;
}

interface IAddTaskPayload {
    projectId: string;
    task: ITusk;
}

interface IDTaskPayload {
    projectId: string;
    taskId: string;
}

const initialState: todoState = {
    projects: [],
    modalTodoIsOpen: false,
    modalAddTodoIsOpen: false,
    modalTaskId: '',
    activeTask: null,
    activeProjectIndex: 0,
    activeTaskIndex: 0
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
            const projectIndex = state.projects.findIndex((item) => {
                return item.id === action.payload.projectId
            })

            state.projects[projectIndex].tasks.push(action.payload.task)
        },
        delTask(state, action: PayloadAction<IDTaskPayload>) {
            const projectIndex = state.projects.findIndex((item) => {
                return item.id === action.payload.projectId
            })

            state.projects[projectIndex].tasks = state.projects[projectIndex].tasks.filter(item => {
                return item.id !== action.payload.taskId
            })
        },
        setActiveProjectId(state, action: PayloadAction<string>) {
            state.activeProjectIndex = state.projects.findIndex(item => {
                return item.id === action.payload
            })
        },
        setActiveTask(state, action: PayloadAction<string>) {
            const taskIndex = state.projects[state.activeProjectIndex].tasks.findIndex(item => {
                return item.id === action.payload
            })

            const newActiveTask = state.projects[state.activeProjectIndex].tasks[taskIndex]

            state.activeTask = newActiveTask
            state.activeTaskIndex = taskIndex

        },
        openModalTodo(state) {
            state.modalTodoIsOpen = true
        },
        closeModalTodo(state) {
            const { activeProjectIndex, activeTaskIndex } = state

            if (state.activeTask !== null) {
                state.projects[activeProjectIndex].tasks[activeTaskIndex] = state.activeTask
            }
            state.modalTodoIsOpen = false
        },
        openModalAddTodo(state) {
            state.modalAddTodoIsOpen = true
        },
        closeModalAddTodo(state) {
            state.modalAddTodoIsOpen = false
        },
        editTaskDescr(state, action: PayloadAction<string>) {
            if (state.activeTask !== null) {
                state.activeTask.descr = action.payload
            }
        }
    }
})

export default todoSlice.reducer;   