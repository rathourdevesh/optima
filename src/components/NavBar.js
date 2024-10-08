import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const NavBar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        const currentPath = location.pathname;
        const endpoint = currentPath.replace(/^\/|\/$/g, '');
        if (endpoint) {
            setActiveLink(endpoint)
        }
    }, [location])

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (

        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" className="logosize" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}>Home</Nav.Link>
                        <Nav.Link href="/services" className={activeLink === 'services' ? 'active navbar-link' : 'navbar-link'}>Services</Nav.Link>
                        {userInfo?.username ? (
                            <Nav.Link href="" className='navbar-link' > {userInfo.username} </Nav.Link>
                        ) : (
                            <Nav.Link href="/login" className={activeLink === 'login' ? 'active navbar-link' : 'navbar-link'}>Login</Nav.Link>
                        )}
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="#"><img src={navIcon1} alt="" /></a>
                            <a href="#"><img src={navIcon2} alt="" /></a>
                            <a href="#"><img src={navIcon3} alt="" /></a>
                        </div>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
