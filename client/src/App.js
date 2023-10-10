import { Routes, Route } from 'react-router-dom';
import './App.css';
import Feedback from './components/Feedback/feedback';
import Register from './components/Register/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Feedback />} />
        <Route exact path="/admin/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
