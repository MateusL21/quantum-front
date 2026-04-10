import { Routes, Route, Navigate } from 'react-router-dom'
import SignInPage from './auth/card/sign-in'
import SignUpPage from './auth/card/sign-up'
import ResetPassPage from './auth/card/reset-pass'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/card/sign-in" replace />} />
      <Route path="/auth/card/sign-in" element={<SignInPage />} />
      <Route path="/auth/card/sign-up" element={<SignUpPage />} />
      <Route path="/auth/card/reset-pass" element={<ResetPassPage />} />
      <Route path="*" element={<Navigate to="/auth/card/sign-in" replace />} />
    </Routes>
  )
}

export default App
