import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './page/Login/Login';
import Home from './page/Home';
import Register from './page/Register/Register';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
