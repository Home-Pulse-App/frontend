import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ImmersiveViewPage from './pages/ImmersiveViewPage';
import SparkComponent from './components/SparkComponent';
import HomesPage from './pages/HomesPage';
import HomeDetailsPage from './pages/HomeDetailsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ProtectedRoute from './protectedRoute';

function App() {
  return (
    <div className='page-body'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/getting-started' element={<GettingStartedPage />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/ImmersiveView' element={<ImmersiveViewPage />} />
          <Route path='/viewer' element={<SparkComponent />} />
          <Route path='/homes' element={<HomesPage />} />
          <Route path='/homes/:id' element={<HomeDetailsPage />} />
          <Route path='/homes/:homeId/rooms/:roomId' element={<RoomDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
