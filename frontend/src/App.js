import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CFPerfRanklist from './pages/CFPerfRanklist'
import VJRanklist from './pages/VJRanklist'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path = "/"
              element = {<Home />}
            />
            <Route
              path = "/cfperformance"
              element = {<CFPerfRanklist />}
            />
            <Route
              path = "/vjudgeranklist"
              element = {<VJRanklist />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
