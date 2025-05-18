import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PayrollForm from './components/payroll-form/payroll-form';
import Home from './components/home/home';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #e0e7ff, #f3e8ff)',
        padding: '1rem',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-employee" element={<PayrollForm />} />
          <Route path="/edit-employee/:id" element={<PayrollForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;