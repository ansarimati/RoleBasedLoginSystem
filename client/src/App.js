import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './components/Register';
import { Login } from './components/Login';
import { UserHome } from "./components/UserHome";
import { AdminHome } from "./components/AdminHome";
import PrivateComponents from './components/PrivateComponents';

function App() {

  return (
    <div className="App">
      <h2>Welcome </h2>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponents />}>
            <Route path='/' element={<UserHome />} />
            <Route path="/adminHome" element={<AdminHome />} />
          </Route>

          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
