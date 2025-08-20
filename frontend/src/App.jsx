import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './contexts/Authcontext.jsx';
import Authentication from './pages/authentication';
import HomeComponent from './pages/home';
import LandingPage from './pages/landing';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />   
            <Route path='/auth' element={<Authentication />} />    
             <Route path='/home's element={<HomeComponent />} />
          </Routes>       
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;