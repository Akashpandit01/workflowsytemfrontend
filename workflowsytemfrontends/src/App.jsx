import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import {
  AuthProvider
} from "./context/AuthContext"

import ProtectedRoute
  from "./routes/ProtectedRoute"

import Home
  from "./pages/Home"

import Login
  from "./pages/Login"

import Signup
  from "./pages/Signup"

import Dashboard
  from "./pages/Dashboard"

import ProjectPage
  from "./pages/ProjectPage"

import SimulationPage
  from "./pages/SimulationPage"

import JoinProject
  from "./pages/JoinProject"

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:projectId"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation/:projectId"
            element={
              <ProtectedRoute>
                <SimulationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/join/:token"
            element={
              <ProtectedRoute>
                <JoinProject />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  )
}

export default App