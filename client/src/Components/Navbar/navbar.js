import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../Context/AuthContext/auth.context';
import { useContext } from 'react';
import { redirect } from 'react-router-dom';

function NavScrollExample() {

  const { logOutUser } = useContext(AuthContext);
  const navigate = redirect();
  function logOutHandler() {
    logOutUser()
    console.log(logOutUser, "user logged out")
    navigate("/");
  }

    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="auth" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/signup">
                  signup
                </NavDropdown.Item>
                <NavDropdown.Item href="/login">
                  login
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOutHandler}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default NavScrollExample;








// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { AuthContext } from '../../Context/AuthContext/auth.context';
// import { useContext } from 'react';
// import { redirect } from 'react-router-dom';

// const ButtonAppBar = () => {

//   const { logOutUser } = useContext(AuthContext);
//   const navigate = redirect();
//   function logOutHandler() {
//     logOutUser()
//     console.log(logOutUser, "user logged out")
//     navigate("/");


//   }
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//         My app
//           </Typography>
//           <Button color="inherit" href="/login">Login</Button>
//           <Button color="inherit" href="/signup">Signup</Button>
//           <Button color="inherit" onClick={logOutHandler}>Log Out</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
// export default ButtonAppBar