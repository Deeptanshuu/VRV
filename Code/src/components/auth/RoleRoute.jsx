import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authService } from '../../services/authService'

function RoleRoute({ children, allowedRoles }) {
  const location = useLocation()
  const isAuthenticated = authService.isAuthenticated()
  const hasRequiredRole = authService.hasRole(allowedRoles)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

RoleRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RoleRoute 