import { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext.jsx'

const UserMenu = () => {
    let { user, logout } = useContext(UserContext)

    return (
        <div id='user-menu'>
            { user ? 
            <>
                <p>Bienvenido {user.name}</p>
                {user.role === 'admin' && <Link to='/admin'>Administración</Link>}
                <Link to='/profile'>Mi perfil</Link>
                <Link to='/profile/orders'>Mis pedidos</Link>
                <a href='#' onClick={logout}>Cerrar sesión</a>
            </>:<>
                <Link to='/login'>Iniciar sesión</Link>
                <Link to='/register'>Registrarme</Link>
            </>
            }
        </div>
    )
}

export default UserMenu