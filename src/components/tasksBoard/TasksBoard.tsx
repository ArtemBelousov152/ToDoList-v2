import { IProject } from '../../models/project';
import MinTask from '../minTask/MinTask';
import { useState, useEffect, DragEvent } from 'react';
import { state } from '../../models/enums';
import { v4 as uuidv4 } from 'uuid';
import { IBoardItem } from '../../models/board';
import { ITusk } from '../../models/task';
import { useAppDispatch } from '../../hooks/redux';
import { todoSlice } from '../../store/reducers/todoSlice';

import './tasksBoard.scss';

interface TasksBoardProps {
    project: IProject
}

const TasksBoard = ({ project }: TasksBoardProps) => {
    const [boards, setBoards] = useState<IBoardItem[]>([]);
    // const [currentBoard, setCurrentBoard] = useState<IBoardItem>();
    const [currentItem, setCurrentItem] = useState<ITusk>();
    const dispatch = useAppDispatch();
    const { editTaskBoard } = todoSlice.actions;

    useEffect(() => {
        setBoards([
            { id: uuidv4(), state: state.QUEUE, items: project.tasks.filter(item => item.state === state.QUEUE) },
            { id: uuidv4(), state: state.DEVELOPMENT, items: project.tasks.filter(item => item.state === state.DEVELOPMENT) },
            { id: uuidv4(), state: state.DONE, items: project.tasks.filter(item => item.state === state.DONE) }
        ])
    }, [project]);

    function dragOverHandler(e: DragEvent<HTMLDivElement | HTMLUListElement>): void {
        e.preventDefault()
        if (e.currentTarget.className === 'tasksBoard__drag_block') {
            e.currentTarget.style.boxShadow = '0 4px 3px gray';
        }
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, board: IBoardItem, item: ITusk): void {
        // setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, board: IBoardItem, item: ITusk): void {
        e.preventDefault()
        const newTask = {...currentItem!, state: board.state}
        const taskIndex = project.tasks.indexOf(currentItem!);
        // const currentIndex = currentBoard!.items.indexOf(currentItem!);
        // currentBoard!.items.splice(currentIndex, 1);
        // const dropIndex = board.items.indexOf(item);
        // board.items.splice(dropIndex + 1, 0, currentItem!);
        // setBoards(boards.map(boardItem => {
        //     if (boardItem.id === board.id) {
        //         return board;
        //     }

        //     if (boardItem.id === currentBoard!.id) {
        //         return currentBoard!;
        //     }

        //     return boardItem;
        // }))
        dispatch(editTaskBoard({newTask, taskIndex }))
    }

    function boardDropHandler(e: DragEvent<HTMLDivElement | HTMLUListElement>, board: IBoardItem): void {
        const newTask = {...currentItem!, state: board.state}
        const taskIndex = project.tasks.indexOf(currentItem!);
        // board.items.push(currentItem!);
        // const currentIndex = currentBoard!.items.indexOf(currentItem!);
        // currentBoard!.items.splice(currentIndex, 1);
        // setBoards(boards.map(boardItem => {
        //     if (boardItem.id === board.id) {
        //         return board;
        //     }

        //     if (boardItem.id === currentBoard!.id) {
        //         return currentBoard!;
        //     }

        //     return boardItem;
        // }))
        dispatch(editTaskBoard({newTask, taskIndex }))
    }

    return (
        <div className="tasksBoard__drag_zone">
            {boards.map(board =>
                <div className="tasksBoard__drar_block" key={board.id}>
                    <ul
                        className="tasksBoard__drag_area"
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => boardDropHandler(e, board)}
                    >
                        {board.items.map(item =>
                            <div
                                className='tasksBoard__drag_item'
                                key={item.id}
                                draggable={true}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}>
                                <MinTask
                                    descr={item.descr}
                                    number={item.number}
                                    priority={item.priority}
                                    startDate={item.startDate}
                                    timeInWork={item.timeInWork}
                                    title={item.title}
                                    key={item.id}
                                    id={item.id}
                                    status={item.status} />
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
        // <div className="tasksBoard__drag_zone">
        //     <div className="tasksBoard__dgar_block">
        //         <ul className="tasksBoard__drag_area">

        //         </ul>
        //     </div>
        //     <div className="tasksBoard__dgar_block">
        //         <ul className="tasksBoard__drag_area tasksBoard__drag_center">

        //         </ul>
        //     </div>
        //     <div className="tasksBoard__dgar_block">
        //         <ul className="tasksBoard__drag_area">
        //             {renderTasks()}
        //         </ul>
        //     </div>
        // </div>
    )
}

export default TasksBoard;