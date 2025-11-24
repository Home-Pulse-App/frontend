import './App.css';
import { Routes, Route } from 'react-router';

// import HomePage from './pages/HomePage';
// import Dashboard from './pages/DashboardPage';
// import Login from './pages/LoginPage';
// import Register from './pages/RegisterPage';
import ImmersiveViewPage from './pages/ImmersiveViewPage';
import SparkComponent from './components/SparkComponent';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />

    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />

    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </Router>
    <div className='page-body'>
      <Routes>
        <Route path="/" element={
          <ImmersiveViewPage/>
        } />
        <Route path="/viewer" element={
          <SparkComponent/>
        } />
      </Routes>
    </div>
  );
}

export default App;
