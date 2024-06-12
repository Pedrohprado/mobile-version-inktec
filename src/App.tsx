import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Status from './pages/status';
import Dashboards from './pages/dashboards';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/status' element={<Status />} />
        <Route path='/dashboards' element={<Dashboards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
