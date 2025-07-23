import React from 'react'
import {Link, Outlet, } from 'react-router-dom'
import { Fragment } from 'react'  // used to wrap multiple elements without adding extra nodes to the DOM
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'; // custom SVG logo component, this allows us to use the SVG as a React component
import './navigation.styles.scss'; // styles for the navigation component

// <Link className='nav-link' to='/'> Home </Link>
//<Link className='nav-link' to='/contact'> Contact </Link>
const Navigation = () => {

   return (
      <Fragment>
         <div className='navigation'> 
            <Link className='logo-container' to='/'>
                 <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
             
                <Link className='nav-link' to='/shop'> SHOP </Link>
                <Link className='nav-link' to='/auth'> SIGN IN </Link>
            </div>
           
        </div>
         {/** The Outlet component is used to render the child routes of the current route */}
      
         {/** In this case, it will render the Home component when the path matches '/' */}
        <Outlet />
      </Fragment>
   )
}

export default Navigation
