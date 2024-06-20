import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from "react-router-dom"
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';
import { useEffect } from 'react';
function BasicExample() {
  let today = new Date().toLocaleDateString()
  const [month, day, year] = today.split('/');
  const formattedToday = `${year}-${parseInt(month)}-${parseInt(day)}`
  const {state, dispatch} = useAuthContext()
  const logout = useLogout()
  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({type: 'login', payload: user})
    }
  }, [])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <h4 className="mb-0">
        <Link to="/" className='text-dark title'><img src="/brand.png" width={40} alt="" /> Grack</Link>
        </h4>
        <Nav>
       {state.user && <div className='d-flex'>
       <NavLink className='text-dark mx-2 auth-links' to="/dashboard">Home</NavLink>
       <NavLink className='text-dark mx-2 auth-links' to={"/track/"+formattedToday}>+ Track</NavLink>
       </div>}
        </Nav>
          <Nav>
           {!state.user && <div className="d-flex">
            <NavLink className='text-dark mx-1' to="/login">Login</NavLink>
            <NavLink className='text-dark mx-1' to="/register">Register</NavLink>
            </div>}
            {state.user && <div className="d-flex align-items-center">
            <span className='text-dark mx-1 auth-links'>{state.user.name}</span>
            <button className='btn btn-outline-dark mx-1 auth-links' onClick={handleClick}>Logout</button>
            </div>}
          </Nav>
      </Container>
    </Navbar>
  );
}

export default BasicExample;