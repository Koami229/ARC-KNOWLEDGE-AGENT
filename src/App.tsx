import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
