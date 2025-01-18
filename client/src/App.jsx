import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DishDetail from './components/DishDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const App = () => {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dish/:id" element={<DishDetail />} />
        </Routes>

        {/* Toast Container: This will show all toasts */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
