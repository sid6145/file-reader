import { Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayDataGrid from './components/DisplayDataGrid';
import FileInput from './components/FileInput';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FileInput />} />
        <Route path="/dashboard" element={<DisplayDataGrid />} />
      </Routes>
    </div>
  );
}

export default App;
