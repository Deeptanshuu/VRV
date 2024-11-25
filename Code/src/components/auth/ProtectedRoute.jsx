import { Navigate, useLocation, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authService } from '../../services/authService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = authService.isAuthenticated()

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children || <Outlet />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}

export default ProtectedRoute 