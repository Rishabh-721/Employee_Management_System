import Dashboard from "./Components/Dashboard";
import {Routes, Route} from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Employeeform from "./Components/Employeeform";
import './App.css';

const App = () => {
  return (
    <div className="dashboard">
    <Header/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/create" element={<Employeeform />}/>
        <Route path="/edit/:id" element={<Employeeform />}/>
      </Routes>
    </main>
    <Footer/>
    </div>
  );
}

export default App;
