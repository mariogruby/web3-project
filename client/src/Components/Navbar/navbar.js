import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../Context/AuthContext/auth.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAppBar = () => {

  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function logOutHandler() {
    logOutUser()
    console.log(logOutUser, "user logged out")
    navigate("/");


  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        My app
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/signup">Signup</Button>
          <Button color="inherit" onClick={logOutHandler}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar