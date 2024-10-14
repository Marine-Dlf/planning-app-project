import React from 'react';
import { NavLink} from 'react-router-dom';
import '../styles/components/navigation.scss'

function Navigation() {
  return (
    <div className='navigation'>
        <ul>
            <NavLink to='/' className={(nav) => nav.isActive ? "nav-active" : ""}>
                <li>Accueil</li>
            </NavLink>
            <NavLink to='/planning' className={(nav) => nav.isActive ? "nav-active" : ""}>
                <li>Planning</li>
            </NavLink>
            <NavLink to='/events' className={(nav) => nav.isActive ? "nav-active" : ""}>
                <li>Evènements</li>
            </NavLink>
        </ul>
    </div>
  )
}

export default Navigation
