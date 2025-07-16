
import ShorternUrlPage from './components/ShorternUrlPage';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import AboutPage from './components/AboutPage/AboutPage';
import Registerpage from './components/Register/Registerpage';
import Login from './components/Login/Login';
import DashboardLayout from './components/Dashboard/DashboardLayout/DashboardLayout';
import { Toaster } from 'react-hot-toast';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './components/ErrorPage';

function AppRouter() {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<PrivateRoute publicPage={true}><Registerpage /></PrivateRoute>} />
        <Route path="/dashbord" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
        <Route path="/login" element={<PrivateRoute publicPage={true}><Login /></PrivateRoute>} />
        <Route path="*" element={<ErrorPage message="We cant't seem to find the page you are Looking for"></ErrorPage>} />
         <Route path="/error" element={<ErrorPage message="Error"></ErrorPage>} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRouter;

export const SubDomainRouter = () => (
  <Routes>
    <Route path="/:url" element={<ShorternUrlPage />} />
  </Routes>
);


