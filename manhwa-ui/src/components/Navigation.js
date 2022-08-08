import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo1.png';
import Search from './Search'
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth'

function Navigation({ setUserStatus, userStatus }) {
    const logout = useLogout();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const signOut = async () => {
        await logout();
        setUserStatus('LoggedOut')
        navigate('/');
    }

    return (
        <nav className="menu">
            <Link to="/" exact> <img src={Logo} /> </Link>
            
            <Link to="/" exact> Home </Link>
            <Link to="/browse-all"> Browse </Link>
            <Link to="/information">Help</Link>

            {
                userStatus === 'LoggedIn' ?
                    <>
                        <Link to="/user-page">{auth.username}</Link>
                        <button onClick={signOut}>Log out</button>
                    </> :
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>

            }
            <Search />
        </nav>
    );

};

export default Navigation; 
