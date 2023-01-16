import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button } from '@mui/material';
import { todoSlice } from '../../store/reducers/todoSlice';

import './descrEditor.scss'

const DescrEditor = () => {
    const { activeTask } = useAppSelector(state => state.todoReducer);
    const [descr, setEditDescr] = useState<string>(activeTask!.descr);
    const [text, setText] = useState<string>(descr);
    const { editTaskDescr, closeDescrEdit } = todoSlice.actions;
    const initialValue = activeTask!.descr;
    const dispatch = useAppDispatch();

    const saveDescr = () => {
        dispatch(editTaskDescr(text));
        dispatch(closeDescrEdit())
    }

    const cancel = () => {
        dispatch(closeDescrEdit())
    }

    return (
        <div className='editor'>
            <Editor
                initialValue={initialValue}
                value={descr}
                onEditorChange={(newValue, editor) => {
                    setEditDescr(newValue)
                    setText(editor.getContent({format: 'text'}))
                }}
                init={{
                    height: 200,
                    width: 500,
                    menubar: false,
                    plugins: [],
                    toolbar: false,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}

                apiKey='3gallnfq6hv0m4ta0j5kdn8unlm296x7jo1o4i9yxaj9izo5'
            />
            <div className="editor__buttons">
                <Button
                    color='inherit'
                    variant='outlined'
                    disabled={!Boolean(descr)}
                    onClick={saveDescr}>
                    Сохранить
                </Button>
                <Button
                    color='inherit'
                    variant='outlined'
                    onClick={cancel}>
                    Отменить
                </Button>
            </div>
        </div>
    )
}

export default DescrEditor
