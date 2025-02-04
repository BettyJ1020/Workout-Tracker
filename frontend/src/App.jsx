import './App.css';
import TodoWrapper from './Components/TodoWrapper';
import LoginPage from './Components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* 預設路徑為登入頁 */}
        <Route path="/" element={<LoginPage />} />
        {/* 待辦事項頁面 */}
        <Route path="/todo" element={<TodoWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
