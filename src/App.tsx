import { useState } from 'react'

// Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Ant Design
import { ConfigProvider, theme } from 'antd'

// Components
import AppLayout from './components/layout/AppLayout'

// Screens
import Onboarding from './components/screens/Onboarding'
import Dashboard from './components/screens/Dashboard'
import LogPeriod from './components/screens/LogPeriod'
import Settings from './components/screens/Settings'


function App() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false)

  const handleOnboardingComplete = () => {
    setIsOnboarded(true)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#ff69b4',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          {!isOnboarded ? (
            <>
              <Route 
                path="/onboarding" 
                element={<Onboarding onComplete={handleOnboardingComplete} />} 
              />
              <Route
                path="*"
                element={<Navigate to="/onboarding" replace />}
              />
            </>
          ) : (
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/log" element={<LogPeriod />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </Route>
          )}
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
