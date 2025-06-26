import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CityDetailsPage from './pages/CityDetailsPage/CityDetailsPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/city/:cityName' element={<CityDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App
