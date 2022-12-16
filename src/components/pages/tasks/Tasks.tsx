import Status from '../../status/Status';
import MinTask from '../../minTask/MinTask';

import './tasks.scss';

function Tasks() {
  return (
    <div className='tasks'>
        <div className="tasks__header">
          <h1 className='tasks__name'>Название проекта</h1>
          <button className="tasks__add">Добавить задачу</button>
          <Status/>
        </div>
        <div className="tasks__drag_zone">
          <div className="tasks__dgar_block">
            <h2 className="tasks__drag_name">Queue</h2>
            <ul className="tasks__drag_area">
              <MinTask/>
            </ul>
          </div>
          <div className="tasks__dgar_block">
            <h2 className="tasks__drag_name">Development</h2>
            <ul className="tasks__drag_area tasks__drag_center">
              
            </ul>
          </div>
          <div className="tasks__dgar_nlock">
            <h2 className="tasks__drag_name">Done</h2>
            <ul className="tasks__drag_area"></ul>
          </div>
        </div>
    </div>
  )
}

export default Tasks