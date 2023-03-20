import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Router } from './routes/Routes';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
