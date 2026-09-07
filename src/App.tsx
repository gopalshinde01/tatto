import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ArtworkModal } from './components/common/ArtworkModal';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { TattooPage } from './pages/TattooPage';
import { RangoliPage } from './pages/RangoliPage';
import { SketchPage } from './pages/SketchPage';
import { PortraitPage } from './pages/PortraitPage';
import { BloodPaintingPage } from './pages/BloodPaintingPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tattoo" element={<TattooPage />} />
          <Route path="/rangoli" element={<RangoliPage />} />
          <Route path="/sketches" element={<SketchPage />} />
          <Route path="/portraits" element={<PortraitPage />} />
          <Route path="/blood-painting" element={<BloodPaintingPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client-portal" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <ArtworkModal />
      <Toast />
    </div>
  );
}

export default App;
