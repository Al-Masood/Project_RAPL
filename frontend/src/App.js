import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CFPerfRanklist from './pages/CFPerfRanklist'
import VJRanklist from './pages/VJRanklist'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
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

            <Route
              path = "/login"
              element = {<Login />}
            />

            <Route
              path = "/signup"
              element = {<SignUp />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
