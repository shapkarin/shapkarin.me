// Basicall add activeClassName to the latest react-router NavLink
import { NavLink as NavLinkComponent } from 'react-router-dom'

export const NavLink = ({ 
  activeClassName, 
  className = '', 
  children, 
  to,
  href,
  ...props 
}) => {
  const finalTo = to || href

  return (
    <NavLinkComponent 
      {...props}
      to={finalTo}
      className={({ isActive }) =>
        isActive 
          ? `${className} ${activeClassName}`
          : className
      }
    >
      {children}
    </NavLinkComponent>
  )
}