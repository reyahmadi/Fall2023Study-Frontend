import { useEffect, useState, createContext  } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, useHistory  } from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';

export const StudentNumber = createContext(1);

function App() {
  const [studentNumber, setStudentNumber] = useState(0);


  return (
    <StudentNumber.Provider value={studentNumber}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setStudentNumber={setStudentNumber} />}  />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </StudentNumber.Provider>
    
  );
}
export default App;
