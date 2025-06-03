import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import ArticlesManager from './pages/Articles/Manager';
import VideosManager from './pages/Videos/Manager';
import CategoriesManager from './pages/Categories/Manager';
import TestimonialsManager from './pages/Testimonials/Manager';

function Admin() {
  return (
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="videos" element={<VideosManager />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default Admin;