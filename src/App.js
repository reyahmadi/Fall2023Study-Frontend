import { useEffect, useState, createContext  } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, useHistory  } from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';

export const StudentNumber = createContext(1);

function App() {
  const [studentNumber, setStudentNumber] = useState(0);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  const handleResize = () => {
    console.log(window.innerWidth)
    if(window.innerWidth < 900){
      setSmallScreen(true);
    }
    else{
      setSmallScreen(false);
    }
  }


  return (
    <StudentNumber.Provider value={studentNumber}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={smallScreen ? <h5 className='small-message'>Please visit the dashboard on a larger screen or make your browser screen wider. </h5> : <Login setStudentNumber={setStudentNumber} />}  />
      <Route path="/dashboard" element={smallScreen ? <h5 className='small-message'>Please visit the dashboard on a larger screen or make your browser screen wider. </h5> : <Dashboard />} />
    </Routes>
    </BrowserRouter>
    </StudentNumber.Provider>
    
  );
}
export default App;
