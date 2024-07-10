import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CFRating from './pages/CFRating'
import CFActivity from './pages/CFActivity'
import CFPerfRanklist from './pages/CFPerfRanklist'
import CFStandings from './pages/CFStandings'
import VJRanklist from './pages/VJRanklist'
import Resources from './pages/Resources'
import HallofFame from './pages/HallofFame'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminPanel from './pages/AdminPanel'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/cfrating"
              element={<CFRating />}
            />

            <Route
              path="/cfactivity"
              element={<CFActivity />}
            />

            <Route 
              path="/cfperformance/:query?" 
              element={<CFPerfRanklist />} 
            />
            
            <Route
              path="/cfstandings"
              element={<CFStandings />}
            />

            <Route
              path="/vjudgeranklist"
              element={<VJRanklist />}
            />

            <Route
              path="/resources"
              element={<Resources />}
            />

            <Route
              path="/halloffame"
              element={<HallofFame />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<SignUp />}
            />

            <Route
              path="/adminpanel"
              element={<AdminPanel />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route 
              path="/forgotpassword" 
              element={<ForgotPassword />} 
            />
            <Route 
              path="/reset/:token" 
              element={<ResetPassword />} 
            />
          </Routes>

        </div>
      </BrowserRouter >
    </div >
  );
}

export default App;
