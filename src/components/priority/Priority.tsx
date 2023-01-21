import Button from '@mui/joy/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState, MouseEvent } from 'react';
import { priority } from '../../models/enums';
import { todoSlice } from '../../store/reducers/todoSlice';

import './priority.scss';

const Priority = () => {
    const { activeTask } = useAppSelector(state => state.todoReducer);
    const dispatch = useAppDispatch();
    const { editPriorityTask } = todoSlice.actions
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const handleClose = (priority?: priority | null, event?: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(null);
        if (priority) {
            dispatch(editPriorityTask(priority))
        }
    }

    if (!activeTask) {
        return (
            <div>Ошибка</div>
        )
    }

    return (
        <div className="priority">
            Приоритет:
            <Button
                id="basic-button"
                variant='plain'
                size='sm'
                endDecorator={<ArrowDropDownIcon />}
                sx={{
                    "--Button-gap": "3px"
                }}
                onClick={handleClick}
            >
                {activeTask.priority}
            </Button>
            <Menu
                id="basic-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
            >
                <MenuItem
                    selected={activeTask.priority === priority.OPTIONAL}
                    onClick={() => handleClose(priority.OPTIONAL)}
                >
                    Необязательно
                </MenuItem>
                <MenuItem
                    selected={activeTask.priority === priority.URGENTLY}
                    onClick={() => handleClose(priority.URGENTLY)}
                >
                    Срочно
                </MenuItem>
                <MenuItem
                    selected={activeTask.priority === priority.IMPORTANT}
                    onClick={() => handleClose(priority.IMPORTANT)}
                >
                    Важно
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Priority;
