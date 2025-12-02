import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ImmersiveViewPage from './pages/ImmersiveViewPage';
import SparkComponent from './components/SparkComponent';
import HomesPage from './pages/HomesPage';
import GettingStartedPage from './pages/GettingStartedPage';

function App() {
  return (
    <div className='page-body'>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/ImmersiveView' element={<ImmersiveViewPage />} />

        <Route path='/getting-started' element={<GettingStartedPage />} />

        <Route path='/viewer' element={<SparkComponent />} />

        <Route path='/homes' element={<HomesPage />} />
      </Routes>
    </div>
  );
}

export default App;
