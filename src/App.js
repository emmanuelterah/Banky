import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTransactionForm from './components/AddTransactionForm';


function App() {
 
  return (
    <Router>
        <div className="App">
        <h2>Bank Of FlatIron</h2>
        <Navbar/>
        <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='about' element={<About/>} />
              <Route path='contact' element={<Contact/>} />
              <Route path="add-transanction" element={<AddTransactionForm/>} />
        </Routes>
        </div>
    </Router> 
  );
}

export default App;