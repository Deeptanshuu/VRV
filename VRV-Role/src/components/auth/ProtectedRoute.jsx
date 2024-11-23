import { Navigate, useLocation, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authService } from '../../services/authService'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children || <Outlet />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}

export default ProtectedRoute 