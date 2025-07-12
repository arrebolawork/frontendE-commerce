// import UserContext from './context/UserContext'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'


const Header = () => {
    const [cartEmpty,setCartEmpty] = useState(true) // default a cart.length == 0

    const navigate = useNavigate()

    const submitSearch = (event) => {
        event.preventDefault()
        const text = event.target.search.value
        navigate(`/search?name=${text}`)
    }

    return (
        <header className='header'>
            <form className='search-form' onSubmit={submitSearch}>
                <input type='text' placeholder='Buscar' name='search' />
                <button className='search-button' type='submit'></button>
            </form>
            <Link to='/'>Inicio</Link>
            <Link to='/shop'>Tienda</Link>
            <Link to='/cart' className='header-button icon-cart'>
                <span className={cartEmpty ? null:'notification'}></span>
            </Link>
            <button className='header-button icon-user'>
                <span className=''></span>
            </button>
        </header>
    )
}

export default Header