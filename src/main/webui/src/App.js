import { React, useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PrivateRoute from './components/PrivateRoute';
import { userService, getToken, updateToken } from './services/UserService';
import AxiosFactory from './services/AxiosFactory';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  );
}

function MenuBar() {
  return (
    <Navbar bg="light">
      <Container fluid="xl">
        <Navbar.Brand href="#home">Quarkus React Keycloak</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav className="navbar-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {userService.isAuthenticated()
              ? <NavDropdown title={userService.getUsername()} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => userService.logout()}>Logout</NavDropdown.Item>
              </NavDropdown>
              : <Nav.Link onClick={() => userService.login()}>Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
        <div></div>
      </Container>
    </Navbar>
  );
}


function Home() {
  return (
    <Container>
      <Container>
        <h2>Home</h2>
        <p>This is the home page of the application. It is visible to anyone including anonymous users.</p>
        <p>You can try to access pages requiring authentication:</p>
        <ul>
          <li>Click on the <a href="/dahboard">dashboard</a> menu item</li>
          <li>Click on the <a href="/profile">profile</a> menu item under the user submenu.</li>
        </ul>
      </Container>
    </Container>
  );
}

function Dashboard() {
  return (
    <Container>
      <Container>
        <h2>Dashboard</h2>
        <p>This is an empty dashboard.</p>
      </Container>
    </Container>
  );
}


function Profile() {

  const [username, setUsername] = useState();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const axios = AxiosFactory.create(getToken, updateToken);
    axios.get('http://localhost:8080/api/user/me').then(res => res.data).then(data => {
      setUsername(data.userName);
      setRoles(data.roles);
    });
  }, []);

  return (
    <Container>
      <Container>
        <h2>Profile</h2>
        <p>This is the profile page. The purpose of the page is to demonstrate how to access a secure resource in the backed.</p>
        <p>The information below is retrieved via http by passing bearer token retrieved from the user service.</p>
        <div>
          <label>Username:</label> {username}
        </div>
        <div>
          <label>Roles:</label>
          <ul>
            {roles.map(role => <li>{role}</li>)}
          </ul>
        </div>
      </Container>
    </Container>
  );
}
