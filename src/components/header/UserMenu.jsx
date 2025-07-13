import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext.jsx'

const UserMenu = () => {
    const { user, fetchProfile } = useContext(UserContext)
    console.log(user, user)
    return (
        <div id='user-menu'>
            { !user ? 
            <>
                <Link to='/login'>Iniciar sesión</Link>
                <Link to='/register'>Registrarme</Link>
            </>:<>
                {user.role === 'admin' ? <Link to='/admin'>Administración</Link>:null}
                <Link to='/profile'>Mi perfil</Link>
                <Link to='/profile/orders'>Mis pedidos</Link>
                <Link to='/logout'>Cerrar sesión</Link>
            </>
            }
        </div>
    )
}

export default UserMenu