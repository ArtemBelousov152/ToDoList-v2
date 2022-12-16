import Status from '../status/Status';

import './minTask.scss';

function MinTask() {
  return (
    <li className="minTask">
        <div className="minTask__header">
            <div className="minTask__number">№1</div>
            <h2 className="minTask__header">Заголовок</h2>
            <Status min={true}/>
        </div>
        <div className="minTask__descr">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, vero, delectus aliquid odit rem reiciendis sapiente obcaecati corporis accusantium amet voluptatibus veritatis consequatur pariatur fugiat facere aut est esse provident. 
        </div>
        <div className="minTask__priority">
            Приоритет: <span>Важно</span>
        </div>
        <div className="minTask__create">
            Дата создания: 01.01.2022
        </div>
        <div className="minTask__workTime">
            Время в работе: 60 часов
        </div>
        <div className="minTask__footer">
            <button className="minTask__del">Удалить задачу</button>
            <button className="minTask__about">Подробнее</button>
        </div>
    </li>
  )
}

export default MinTask