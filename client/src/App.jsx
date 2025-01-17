import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DishDetail from './components/DishDetail';

const App = () => {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dish/:id" element={<DishDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
