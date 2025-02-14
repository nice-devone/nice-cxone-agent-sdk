import './App.css';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

import Navbar from './components/side-navbar/NavBar';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Navbar/>
      </ErrorBoundary>     
    </div>
  );
}

export default App;
