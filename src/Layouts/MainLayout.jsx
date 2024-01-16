import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({children}) => {
  return (
    <div>
    <header className='text-center'>
        <nav className="navbar navbar-light bg-primary text-center ">
            <div className="container text-white text-center ">
                <Link to='/' className="navbar-brand ">
                <h2 className=''>Wendel's Shop</h2>
                </Link>
            </div>
        </nav>
    </header>
    <main>
        <div className="container mt-3 text-center">
           {children}

        </div>
        <ToastContainer/>
    </main>
</div>
  )
}

export default MainLayout