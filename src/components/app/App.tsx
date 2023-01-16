import './App.scss';
import { Projects, Tasks } from '../pages';
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={<Projects/>}/>
                <Route path='/tasks/:id' element={<Tasks/>}/>
                <Route/>
            </Routes>
        </div>
    )
}

export default App;
