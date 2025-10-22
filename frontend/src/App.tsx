import { Route, Routes } from 'react-router-dom';
import MainHeader from './components/layout/MainHeader';
import MainFooter from './components/layout/MainFooter';
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <MainHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <MainFooter />
    </div>
  );
}

export default App;
