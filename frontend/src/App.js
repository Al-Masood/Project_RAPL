import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CFRating from './pages/CFRating'
import CFActivity from './pages/CFActivity'
import CFPerformance from './pages/CFPerformance'
import CFStandings from './pages/CFStandings'
import TFCRanklist from './pages/TFCRanklist'
import SessionPlan from './pages/SessionPlan'
import Achievements from './pages/Achievements'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAuthContext } from "./hooks/UseAuthContext"
import './css/App.css'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/cfrating" element={<CFRating />} />

            <Route path="/cfactivity" element={<CFActivity />} />

            <Route
              path="/cfperformance/:query?"
              element={<CFPerformance />}
            />

            <Route path="/cfstandings" element={<CFStandings />} />

            <Route path="/tfcranklist" element={<TFCRanklist />} />

            <Route path="/sessionplan" element={<SessionPlan />} />

            <Route path="/achievements" element={<Achievements />} />

            {!user && (
              <Route path="/login" element={<Login />} />

            )}

            {!user && (
              <Route path="/signup" element={<SignUp />} />
            )}
            {!user && (
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            )}
            {!user && (
              <Route path="/reset/:token" element={<ResetPassword />} />
            )}
            {user && (
              <Route path="/profile" element={<Profile />} />
            )}

            {user && user.admin && (
              <Route path="/admin" element={<Admin />} />
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
